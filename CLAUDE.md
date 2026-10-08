# aisistema-landing — contexto del proyecto

Landing de **aisistema.net**. Su función comercial es una sola: captar leads por el
formulario de demo y calificarlos automáticamente.

---

## Infraestructura (verificado 2026-07-22)

| Qué | Dónde |
|---|---|
| Repo | `claudiopascuarelli/aisistema-landing` — **público** |
| Rama de producción | **`main`** (no `principal`) |
| Hosting | Vercel, proyecto **`aisistema-landing-octf`** (`prj_K5IvcNqO9WrlhTHG6KhtGB1yVNCd`) |
| Team Vercel | `team_c6niGpTfcBmjFQwnSXm1u83b` |
| Dominios | aisistema.net, www.aisistema.net |
| DNS | Hostinger (solo DNS y correo; el sitio NO se sirve desde ahí) |
| Framework | TanStack Start (SSR), Vite, Node 24 |
| Base de datos | Supabase **propio** (cuenta claudio@aisistema.net), proyecto `ctyslonviurkychommqy`, desde el 2026-10-08. Antes era de Lovable Cloud |
| Analytics | GA4 propiedad `393748429` / `536404992`, flujo WEBAISISTEMA |

**Deploy:** push a `main` → Vercel buildea y publica solo. No hay paso manual.

---

## Base de datos

Desde el 2026-10-08 la base es un Supabase propio. Se consulta y modifica con el conector
MCP `supabase-aisistema`, configurado solo para esta carpeta y fijado a este proyecto.
La tabla `leads` se creó con la migración `create_leads`. RLS está activado y no tiene
políticas: solo escribe el service role.

`supabase/migrations/*.sql` del repo **no** corresponde a esta base: es de la época de
Lovable y nunca se aplicó. No lo uses como referencia. La fuente de verdad es la base.

### Esquema real de `leads`

`id`, `created_at`, `nombre`, `email`, `sistema`, `articulos`, `empleados`,
`empresa`, `rubro`, `telefono`, `q_urgencia`, `q_presupuesto`, `q_decisor`,
`mensaje`, `q_sistema_actual`, `score`, `semaforo`, `ai_email`.

Solo `nombre` y `email` son obligatorias.

Ojo con los nombres: la columna de empleados es **`empleados`**, no `q_empleados`
(las otras cuatro preguntas sí llevan prefijo `q_`). `sistema` y `articulos` existen
pero nada las escribe — son de una versión anterior del formulario.

`src/integrations/supabase/types.ts` es **autogenerado**. Si hay que corregirlo,
regeneralo contra la base real; no lo parchees a mano.

---

## Flujo del formulario

`src/routes/index.tsx` (form) → `src/lib/leads.functions.ts` (`submitLead`, server function)

1. Valida con Zod.
2. Califica: `scoreLead()` da 0-100 y un semáforo (verde ≥70, amarillo ≥45, rojo <45).
3. Redacta un mail de respuesta con Claude (`claude-opus-4-8` vía `@anthropic-ai/sdk`).
4. Inserta en `leads` usando `supabaseAdmin` (service role, bypassa RLS).
5. Devuelve score, semáforo y el mail para mostrarlos en pantalla.

Si `ANTHROPIC_API_KEY` no está, `draftEmailWithAI` cae a `fallbackEmail()`, que es un
texto fijo que se adapta al semáforo. **Falla en silencio**: no hay error visible, solo
mails genéricos. Si los mails salen genéricos, revisar esa variable primero.

---

## Reglas del prompt del mail (NO relajar)

El mail se le envía al prospecto **sin revisión humana**. El prompt tiene una regla
absoluta de no inventar clientes, casos de éxito, cantidad de usuarios ni resultados
de terceros.

Esto no es decorativo: la versión original decía "mostrar casos similares" y el modelo
escribió *"Ya acompañamos a varias distribuidoras del rubro con resultados concretos"* —
falso, y salía firmado por Claudio. Si tocás ese prompt, la regla se queda.

Otras reglas del prompt: español rioplatense (vos/tenés), máximo 140 palabras, empieza
con "Asunto:", firma "Claudio Pascuarelli — Aisistema" en primera persona (Claudio trabaja solo), nunca menciona el score ni el semáforo.

---

## Variables de entorno (en Vercel, no en el repo)

| Variable | Para qué |
|---|---|
| `SUPABASE_URL` | Conexión a la base |
| `SUPABASE_SERVICE_ROLE_KEY` | Escritura en `leads` (bypassa RLS) |
| `ANTHROPIC_API_KEY` | Redacción del mail (sin ella → texto de respaldo) |

**El repo es público: ninguna clave va en el código.** Las variables nuevas no aplican
a builds ya hechos — hay que redeployar para que las tome.

---

## Antes de dar algo por terminado

El typecheck no alcanza: el bug del formulario compilaba perfecto y fallaba en runtime,
porque el desajuste era contra la base.

```bash
npx tsc --noEmit && bun run build
node -e "import('./dist/server/server.js').then(async m=>console.log((await m.default.fetch(new Request('https://aisistema.net/'))).status))"
```

La última línea renderiza la página en local: tiene que dar 200. El 8-oct-2026 el build
pasó y producción dio 500 por versiones desalineadas de TanStack (Start y react-router
se actualizan juntos).

Y después probar el flujo real: enviar el formulario en producción, verificar que el
lead llegó a la base y que el aviso llegó por mail, y **borrar el registro de prueba**.

Cada lead le llega a Claudio por mail (SMTP de Hostinger, `SMTP_USER` / `SMTP_PASS` en
Vercel). No hay exportación a CSV: si hace falta ver los leads, están en Supabase.

---

## Qué NO hacer

- **No usar `supabase/migrations/` del repo** — es de la época de Lovable.
- **No editar `types.ts` a mano** — es autogenerado.
- **No pushear a `principal`** — esa rama no dispara nada.
- **No poner claves en el código** — el repo es público.
- **No relajar la regla de no inventar** en el prompt del mail.

---

## Contexto de negocio

Producto: sistema de gestión para PyMEs argentinas, apuntado a mayoristas y
distribuidoras con catálogo grande y varias sucursales. El diferencial de Claudio son
sus 40 años en el mundo industrial — no hace falta inventar cartera de clientes.

Nunca usar las palabras "SaaS" ni "abono mensual" en textos de cara al cliente.

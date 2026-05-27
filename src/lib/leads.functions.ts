import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const Q_OPTIONS = {
  empleados: ["1-5", "6-20", "21-50", "50+"],
  sistema_actual: ["excel", "enlatado", "a-medida", "nada"],
  urgencia: ["ya", "1-3m", "3-6m", "investigando"],
  presupuesto: ["definido", "estimado", "sin-definir", "no-se"],
  decisor: ["si", "co-decisor", "influyo", "no"],
} as const;

const LeadSchema = z.object({
  nombre: z.string().min(1).max(120),
  empresa: z.string().min(1).max(120),
  rubro: z.string().max(120).optional().default(""),
  email: z.string().email().max(200),
  telefono: z.string().max(40).optional().default(""),
  mensaje: z.string().max(2000).optional().default(""),
  q_empleados: z.enum(Q_OPTIONS.empleados),
  q_sistema_actual: z.enum(Q_OPTIONS.sistema_actual),
  q_urgencia: z.enum(Q_OPTIONS.urgencia),
  q_presupuesto: z.enum(Q_OPTIONS.presupuesto),
  q_decisor: z.enum(Q_OPTIONS.decisor),
});

type LeadInput = z.infer<typeof LeadSchema>;

// Scoring 0-100
function scoreLead(d: LeadInput): { score: number; semaforo: "verde" | "amarillo" | "rojo" } {
  let s = 0;

  // Tamaño (PyME real)
  s += { "1-5": 10, "6-20": 25, "21-50": 25, "50+": 15 }[d.q_empleados];

  // Sistema actual (más dolor = más fit)
  s += { excel: 25, enlatado: 18, "a-medida": 10, nada: 22 }[d.q_sistema_actual];

  // Urgencia
  s += { ya: 25, "1-3m": 20, "3-6m": 10, investigando: 3 }[d.q_urgencia];

  // Presupuesto
  s += { definido: 15, estimado: 12, "sin-definir": 5, "no-se": 2 }[d.q_presupuesto];

  // Decisor
  s += { si: 10, "co-decisor": 8, influyo: 5, no: 1 }[d.q_decisor];

  const score = Math.min(100, Math.max(0, s));
  const semaforo = score >= 70 ? "verde" : score >= 45 ? "amarillo" : "rojo";
  return { score, semaforo };
}

async function draftEmailWithAI(d: LeadInput, score: number, semaforo: string): Promise<string> {
  const apiKey = process.env.LOVABLE_API_KEY;
  if (!apiKey) return fallbackEmail(d, semaforo);

  const sistema = `Sos un asistente comercial de Aisistema (software de gestión para PyMEs argentinas).
Tu tarea: redactar un mail breve, cálido y profesional en español rioplatense (vos/tenés) respondiendo a un lead que pidió una demo.
Adaptá el tono y next-step al semáforo de calificación:
- verde: alta prioridad, proponer reunión concreta esta semana, mostrar entusiasmo y casos similares.
- amarillo: interés genuino, pedir 2-3 datos extra (rubro detallado, prioridades, plazo) antes de la demo.
- rojo: agradecer, ofrecer material informativo y dejar puerta abierta sin presionar.
Reglas: máximo 140 palabras, asunto + cuerpo + firma "Equipo Aisistema". No menciones el score ni el semáforo internamente.
Devolvé SOLO el mail en texto plano, empezando con "Asunto:".`;

  const usuario = `Lead:
- Nombre: ${d.nombre}
- Empresa: ${d.empresa}
- Rubro: ${d.rubro || "no indicado"}
- Empleados: ${d.q_empleados}
- Sistema actual: ${d.q_sistema_actual}
- Urgencia: ${d.q_urgencia}
- Presupuesto: ${d.q_presupuesto}
- Decisor: ${d.q_decisor}
- Mensaje: ${d.mensaje || "(no dejó mensaje)"}

Calificación interna: score=${score}, semáforo=${semaforo}.`;

  try {
    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: sistema },
          { role: "user", content: usuario },
        ],
      }),
    });
    if (!res.ok) return fallbackEmail(d, semaforo);
    const json = await res.json();
    const text = json?.choices?.[0]?.message?.content?.trim();
    return text || fallbackEmail(d, semaforo);
  } catch {
    return fallbackEmail(d, semaforo);
  }
}

function fallbackEmail(d: LeadInput, semaforo: string): string {
  const next =
    semaforo === "verde"
      ? "Te propongo una llamada de 30 minutos esta semana para mostrarte el sistema funcionando."
      : semaforo === "amarillo"
      ? "Antes de coordinar la demo me gustaría conocer un poco más tu operación. ¿Te paso 3 preguntas por mail?"
      : "Te dejo material para que veas si te suma, y cuando quieras avanzar estoy a un mensaje.";
  return `Asunto: ${d.nombre}, gracias por escribirnos\n\nHola ${d.nombre},\n\nRecibí tu consulta sobre ${d.empresa}. ${next}\n\nQuedo atento.\n\nEquipo Aisistema`;
}

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => LeadSchema.parse(data))
  .handler(async ({ data }) => {
    const { score, semaforo } = scoreLead(data);
    const aiEmail = await draftEmailWithAI(data, score, semaforo);

    const { error } = await supabaseAdmin.from("leads").insert({
      nombre: data.nombre,
      empresa: data.empresa,
      rubro: data.rubro || null,
      email: data.email,
      telefono: data.telefono || null,
      mensaje: data.mensaje || null,
      q_empleados: data.q_empleados,
      q_sistema_actual: data.q_sistema_actual,
      q_urgencia: data.q_urgencia,
      q_presupuesto: data.q_presupuesto,
      q_decisor: data.q_decisor,
      score,
      semaforo,
      ai_email: aiEmail,
    });

    if (error) {
      console.error("submitLead insert error", error);
      throw new Error("No pudimos registrar tu consulta. Probá de nuevo o escribinos a hola@aisistema.net.");
    }

    return { ok: true as const, score, semaforo, aiEmail };
  });

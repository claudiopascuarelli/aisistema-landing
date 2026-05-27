# Cuestionario de calificación + Email con semáforo

Generar dos entregables en PDF dentro de `/mnt/documents/`:

## 1. Cuestionario corto (1 página) — `cuestionario_calificacion.pdf`

8 preguntas, cada una con puntaje 0-3. Total 24 puntos.

1. **Presupuesto mensual disponible para el proyecto**
   (0) <$200 · (1) $200–500 · (2) $500–1500 · (3) >$1500
2. **Urgencia / plazo deseado**
   (0) Sin fecha · (1) >3 meses · (2) 1–3 meses · (3) <1 mes
3. **Rol de quien responde**
   (0) Curioso · (1) Empleado · (2) Mando medio · (3) Dueño/decisor
4. **Tamaño de la empresa**
   (0) Personal · (1) 1–5 · (2) 6–20 · (3) >20
5. **Dolor concreto identificado**
   (0) Explorando · (1) Idea vaga · (2) Problema claro · (3) Problema cuantificado en $/h
6. **Intentos previos de resolverlo**
   (0) Ninguno · (1) Manual · (2) Otra herramienta · (3) Otra herramienta que falló
7. **Canal y velocidad de respuesta del lead**
   (0) Sin datos · (1) Solo email · (2) Email + tel · (3) Respondió <24 h
8. **Encaje con la oferta de aisistema.net (IA / automatización)**
   (0) No encaja · (1) Tangencial · (2) Encaja · (3) Caso ideal

## 2. Semáforo de conversión

- **🔴 Rojo (0–9)**: baja probabilidad — nurturing, contenido, sin tiempo comercial.
- **🟡 Amarillo (10–17)**: media — call de descubrimiento de 20 min, calificar más.
- **🟢 Verde (18–24)**: alta — propuesta/demo en <48 h, prioridad máxima.

## 3. Plantilla de email de respuesta — `email_respuesta_lead.pdf`

Tres versiones (una por color de semáforo) listas para copiar, con:
- Asunto
- Saludo personalizado (placeholders `{nombre}`, `{empresa}`)
- Reconocimiento del dolor mencionado
- Próximo paso claro según semáforo (link a recursos / link a calendario / propuesta directa)
- Firma

## Implementación técnica
Script Python con `reportlab` que arme ambos PDFs con la misma identidad visual que la auditoría anterior. QA de cada página convirtiendo a imagen antes de entregar.

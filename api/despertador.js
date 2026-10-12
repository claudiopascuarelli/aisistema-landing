// Cron diario de Vercel (ver vercel.json): una consulta mínima a Supabase para que
// el plan gratis no pause la base por inactividad (pausa a los 7 días sin uso).
export default async function handler(req, res) {
  const r = await fetch(`${process.env.SUPABASE_URL}/rest/v1/leads?select=id&limit=1`, {
    headers: {
      apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
    },
  });
  res.status(r.ok ? 200 : 502).json({ ok: r.ok, supabase: r.status });
}

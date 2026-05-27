
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  empresa TEXT NOT NULL,
  rubro TEXT,
  email TEXT NOT NULL,
  telefono TEXT,
  mensaje TEXT,
  q_empleados TEXT NOT NULL,
  q_sistema_actual TEXT NOT NULL,
  q_urgencia TEXT NOT NULL,
  q_presupuesto TEXT NOT NULL,
  q_decisor TEXT NOT NULL,
  score INT NOT NULL DEFAULT 0,
  semaforo TEXT NOT NULL DEFAULT 'amarillo',
  ai_email TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.leads TO anon, authenticated;
GRANT ALL ON public.leads TO service_role;

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a lead"
  ON public.leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

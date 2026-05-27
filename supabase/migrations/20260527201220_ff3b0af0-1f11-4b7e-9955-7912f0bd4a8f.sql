-- Drop overly permissive INSERT policy. The submitLead server function
-- uses supabaseAdmin (service role) which bypasses RLS, so anon/authenticated
-- no longer need direct INSERT access.
DROP POLICY IF EXISTS "Anyone can submit a lead" ON public.leads;

-- Revoke direct table privileges from anon and authenticated roles.
-- All lead writes must go through the server function.
REVOKE ALL ON public.leads FROM anon;
REVOKE ALL ON public.leads FROM authenticated;

-- Ensure service_role retains full access (used by supabaseAdmin).
GRANT ALL ON public.leads TO service_role;

-- RLS stays enabled; with no policies, anon/authenticated cannot SELECT,
-- INSERT, UPDATE, or DELETE. Defense in depth on top of the revoked grants.
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
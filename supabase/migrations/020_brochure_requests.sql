-- Leads captured from the brochure-download gate (hero section + program pages) —
-- same pattern as demo_requests: written directly via the server's service-role
-- client (app/api/brochure-request/route.ts), independent of n8n.

create table public.brochure_requests (
  id uuid primary key default gen_random_uuid(),

  first_name text not null,
  last_name text not null,
  mobile text not null,
  email text not null,
  state text,
  program text,

  created_at timestamptz not null default now()
);

alter table public.brochure_requests enable row level security;
-- No policies: only the server's service-role client (which bypasses RLS) reads/writes this
-- table. Public/anon and authenticated users have zero direct access, by design — same
-- deliberate exception already used for `payments`, `demo_requests` and `lead_magnet_requests`.

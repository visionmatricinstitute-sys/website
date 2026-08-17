-- Leads captured from gated free resources (starting with the Data Center Load
-- Calculator). Same pattern as demo_requests: written directly via the server's
-- service-role client (app/api/lead-magnet/route.ts), independent of n8n.

create table public.lead_magnet_requests (
  id uuid primary key default gen_random_uuid(),

  name text not null,
  email text not null,
  whatsapp text,
  role text, -- self-identified persona, e.g. "Student / Fresher", "Working Engineer"
  magnet text not null default 'data-center-load-calculator', -- which resource they downloaded

  created_at timestamptz not null default now()
);

alter table public.lead_magnet_requests enable row level security;
-- No policies: only the server's service-role client (which bypasses RLS) reads/writes this
-- table. Public/anon and authenticated users have zero direct access, by design — same
-- deliberate exception already used for `payments` and `demo_requests`.

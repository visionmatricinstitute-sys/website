-- Admission applications and newsletter signups.
-- Same reasoning as demo_requests (005): both forms previously depended solely
-- on the n8n webhook via ADMISSION_SHEET_WEBHOOK_URL. When n8n is down (or that
-- env var is misconfigured), submissions were silently lost. These tables give
-- both forms a reliable, n8n-independent source of truth; the webhook is still
-- called afterwards, best-effort, to keep the existing CRM sheet in sync.

create table public.admission_requests (
  id uuid primary key default gen_random_uuid(),

  first_name text not null,
  last_name text not null,
  email text not null,
  phone text not null,
  course text not null,
  education text,
  message text,

  status text not null default 'new' check (status in ('new', 'contacted', 'enrolled', 'declined')),

  created_at timestamptz not null default now()
);

alter table public.admission_requests enable row level security;

create table public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table public.newsletter_subscribers enable row level security;

-- No policies on either table: only the server's service-role client (which
-- bypasses RLS) reads/writes these. Public/anon and authenticated users have
-- zero direct access, by design — same deliberate exception already used for
-- `payments`, `demo_requests`, and `lead_magnet_requests`.

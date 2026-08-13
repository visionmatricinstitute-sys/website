-- Demo class registration requests.
-- Written directly via the server's service-role client (app/api/demo-request/route.ts),
-- independent of the n8n lead-capture webhook — this is the reliable source of truth even
-- when n8n is unavailable. The webhook is still called best-effort afterwards to keep the
-- existing CRM sheet in sync, but a webhook failure no longer loses the request.

create table public.demo_requests (
  id uuid primary key default gen_random_uuid(),

  student_name text not null,
  education text,
  college text,
  current_year_semester text,
  graduation_year text,
  current_occupation text,
  work_experience text,
  current_company text,
  design_experience text,
  software_known text[],
  expectations text,
  training_goal text,
  phone text not null,
  email text,
  heard_from text,
  course_interest text,

  -- Filled in later by a trainer after the demo actually happens — not part of registration.
  status text not null default 'new' check (status in ('new', 'contacted', 'scheduled', 'completed', 'no_show')),
  trainer_notes text,
  demo_class_date date,
  trainer_name text,

  created_at timestamptz not null default now()
);

alter table public.demo_requests enable row level security;
-- No policies: only the server's service-role client (which bypasses RLS) reads/writes this
-- table. Public/anon and authenticated users have zero direct access, by design — matches
-- the same deliberate exception already used for the `payments` table.

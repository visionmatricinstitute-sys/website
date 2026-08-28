-- Vision Matrix Institute — Admin audit log
-- Run this once in the Supabase project's SQL Editor after 013_announcements.sql.
--
-- Confirmed absent from the codebase entirely before this — no audit/activity-log table
-- anywhere. Starting with the actions added in this migration's PR (quiz/assignment
-- edit-delete); retrofitting it into the other admin actions already shipped in separate,
-- still-unmerged branches is a deliberate fast-follow once those merge, not done here —
-- see LMS_IMPLEMENTATION_PLAN.md.

create table public.audit_log (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references auth.users(id),
  action text not null,
  entity_type text not null,
  entity_id uuid,
  metadata jsonb,
  created_at timestamptz not null default now()
);

create index audit_log_created_at_idx on public.audit_log (created_at desc);

alter table public.audit_log enable row level security;

create policy "Admins manage audit log"
  on public.audit_log for all
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'))
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

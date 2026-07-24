-- Vision Matrix Institute — Live Classes schema
-- Run this once in the Supabase project's SQL Editor after schema.sql.

alter table public.profiles
  add column if not exists role text not null default 'student' check (role in ('student', 'admin'));

create table public.live_classes (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  title text not null,
  description text,
  scheduled_start timestamptz not null,
  duration_minutes int not null default 60,
  zoom_meeting_id text,
  join_url text,
  start_url text,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);

alter table public.live_classes enable row level security;

create policy "Enrolled students see live classes for their courses"
  on public.live_classes for select
  using (
    exists (
      select 1 from public.enrollments e
      where e.student_id = auth.uid() and e.course_id = live_classes.course_id
    )
  );

create policy "Admins manage live classes"
  on public.live_classes for all
  using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  )
  with check (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

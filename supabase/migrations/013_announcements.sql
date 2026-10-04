-- Vision Matrix Institute — Announcements
-- Run this once in the Supabase project's SQL Editor after 012_student_enrollment_admin.sql.
--
-- Confirmed absent from the codebase entirely before this — no table, no admin page, no
-- student-facing display. Same "Admins manage X" idiom used everywhere else in this schema.

create table public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  audience_type text not null default 'all' check (audience_type in ('all', 'course', 'student')),
  course_id uuid references public.courses(id) on delete cascade,
  student_id uuid references auth.users(id) on delete cascade,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);

alter table public.announcements enable row level security;

create policy "Students see relevant announcements"
  on public.announcements for select
  using (
    audience_type = 'all'
    or (audience_type = 'student' and student_id = auth.uid())
    or (
      audience_type = 'course'
      and exists (select 1 from public.enrollments e where e.student_id = auth.uid() and e.course_id = announcements.course_id)
    )
  );

create policy "Admins manage announcements"
  on public.announcements for all
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'))
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create table public.announcement_reads (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references auth.users(id) on delete cascade,
  announcement_id uuid not null references public.announcements(id) on delete cascade,
  read_at timestamptz not null default now(),
  unique (student_id, announcement_id)
);

alter table public.announcement_reads enable row level security;

create policy "Students manage their own reads"
  on public.announcement_reads for all
  using (auth.uid() = student_id)
  with check (auth.uid() = student_id);

create policy "Admins see all reads"
  on public.announcement_reads for select
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

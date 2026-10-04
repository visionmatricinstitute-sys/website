-- Vision Matrix Institute — Course authoring
-- Run this once in the Supabase project's SQL Editor after 008_chapters.sql.
--
-- Today courses/course_modules can only be created by hand-written SQL (see supabase/schema.sql) —
-- there is no admin UI. This migration adds the fields + admin write policy the new
-- app/admin/courses UI needs, and marks the one existing course published so it keeps
-- appearing on the student dashboard exactly as it does today.

alter table public.courses add column if not exists status text not null default 'draft' check (status in ('draft', 'published', 'archived'));
alter table public.courses add column if not exists short_description text;
alter table public.courses add column if not exists category text;
alter table public.courses add column if not exists level text;
alter table public.courses add column if not exists language text not null default 'English';
alter table public.courses add column if not exists thumbnail_url text;
alter table public.courses add column if not exists prerequisites text;
alter table public.courses add column if not exists learning_objectives text;

-- Every course created before this migration (i.e. the one real course) must stay visible —
-- without this, it would default to 'draft' and vanish from the student dashboard's
-- "Available Programs" list the moment the app code starts filtering on status.
update public.courses set status = 'published' where status = 'draft';

-- The original schema only granted a public SELECT policy on courses — admins had no
-- way to INSERT/UPDATE/DELETE it until now. Same "Admins manage X" idiom used everywhere
-- else in this schema (course_modules, chapters, assignments, quizzes).
create policy "Admins manage courses"
  on public.courses for all
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'))
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

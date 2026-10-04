-- Vision Matrix Institute — Instructor role
-- Run this once in the Supabase project's SQL Editor after 014_audit_log.sql.
--
-- Adds a real 'instructor' role distinct from 'admin', scoped to only the courses an
-- admin has assigned them to (via the new course_instructors table). Every policy below
-- is additive alongside the existing "Admins manage X" policies (Postgres RLS combines
-- multiple permissive policies with OR) — instructors never get broader access than an
-- assigned course, and nothing about existing admin/student access changes.
--
-- Two gaps this also fills, both directly needed for "instructor sees their students'
-- progress" but previously missing even for admins: module_progress and enrollments had
-- no admin-wide read policy at all (chapter_progress and quiz_attempts already had one).

-- ---------------------------------------------------------------------------
-- Widen profiles.role — done via a dynamic lookup rather than a hardcoded
-- constraint name, since Postgres auto-names the inline check constraint from
-- migration 002 and this migration shouldn't assume what that name turned out to be.
-- ---------------------------------------------------------------------------
do $$
declare
  con_name text;
begin
  select conname into con_name
  from pg_constraint
  where conrelid = 'public.profiles'::regclass
    and contype = 'c'
    and pg_get_constraintdef(oid) ilike '%role%';
  if con_name is not null then
    execute format('alter table public.profiles drop constraint %I', con_name);
  end if;
end $$;

alter table public.profiles add constraint profiles_role_check check (role in ('student', 'admin', 'instructor'));

-- ---------------------------------------------------------------------------
-- Which instructor owns which course
-- ---------------------------------------------------------------------------
create table public.course_instructors (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  instructor_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (course_id, instructor_id)
);

alter table public.course_instructors enable row level security;

create policy "Admins manage course instructor assignments"
  on public.course_instructors for all
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'))
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "Instructors see their own course assignments"
  on public.course_instructors for select
  using (instructor_id = auth.uid());

-- ---------------------------------------------------------------------------
-- Scoped instructor access — additive alongside each table's existing admin policy
-- ---------------------------------------------------------------------------
create policy "Instructors manage their own courses"
  on public.courses for all
  using (exists (select 1 from public.course_instructors ci where ci.instructor_id = auth.uid() and ci.course_id = courses.id))
  with check (exists (select 1 from public.course_instructors ci where ci.instructor_id = auth.uid() and ci.course_id = courses.id));

create policy "Instructors manage modules for their courses"
  on public.course_modules for all
  using (exists (select 1 from public.course_instructors ci where ci.instructor_id = auth.uid() and ci.course_id = course_modules.course_id))
  with check (exists (select 1 from public.course_instructors ci where ci.instructor_id = auth.uid() and ci.course_id = course_modules.course_id));

create policy "Instructors manage chapters for their courses"
  on public.chapters for all
  using (exists (
    select 1 from public.course_instructors ci
    join public.course_modules cm on cm.id = chapters.module_id
    where ci.instructor_id = auth.uid() and ci.course_id = cm.course_id
  ))
  with check (exists (
    select 1 from public.course_instructors ci
    join public.course_modules cm on cm.id = chapters.module_id
    where ci.instructor_id = auth.uid() and ci.course_id = cm.course_id
  ));

create policy "Instructors manage resources for their courses"
  on public.resources for all
  using (exists (select 1 from public.course_instructors ci where ci.instructor_id = auth.uid() and ci.course_id = resources.course_id))
  with check (exists (select 1 from public.course_instructors ci where ci.instructor_id = auth.uid() and ci.course_id = resources.course_id));

create policy "Instructors manage quizzes for their courses"
  on public.quizzes for all
  using (exists (
    select 1 from public.course_instructors ci
    join public.course_modules cm on cm.id = quizzes.module_id
    where ci.instructor_id = auth.uid() and ci.course_id = cm.course_id
  ))
  with check (exists (
    select 1 from public.course_instructors ci
    join public.course_modules cm on cm.id = quizzes.module_id
    where ci.instructor_id = auth.uid() and ci.course_id = cm.course_id
  ));

create policy "Instructors manage quiz questions for their courses"
  on public.quiz_questions for all
  using (exists (
    select 1 from public.course_instructors ci
    join public.quizzes q on q.id = quiz_questions.quiz_id
    join public.course_modules cm on cm.id = q.module_id
    where ci.instructor_id = auth.uid() and ci.course_id = cm.course_id
  ))
  with check (exists (
    select 1 from public.course_instructors ci
    join public.quizzes q on q.id = quiz_questions.quiz_id
    join public.course_modules cm on cm.id = q.module_id
    where ci.instructor_id = auth.uid() and ci.course_id = cm.course_id
  ));

create policy "Instructors see quiz attempts for their courses"
  on public.quiz_attempts for select
  using (exists (
    select 1 from public.course_instructors ci
    join public.quizzes q on q.id = quiz_attempts.quiz_id
    join public.course_modules cm on cm.id = q.module_id
    where ci.instructor_id = auth.uid() and ci.course_id = cm.course_id
  ));

create policy "Instructors manage assignments for their courses"
  on public.assignments for all
  using (exists (select 1 from public.course_instructors ci where ci.instructor_id = auth.uid() and ci.course_id = assignments.course_id))
  with check (exists (select 1 from public.course_instructors ci where ci.instructor_id = auth.uid() and ci.course_id = assignments.course_id));

create policy "Instructors view submissions for their courses"
  on public.assignment_submissions for select
  using (exists (
    select 1 from public.course_instructors ci
    join public.assignments a on a.id = assignment_submissions.assignment_id
    where ci.instructor_id = auth.uid() and ci.course_id = a.course_id
  ));

create policy "Instructors grade submissions for their courses"
  on public.assignment_submissions for update
  using (exists (
    select 1 from public.course_instructors ci
    join public.assignments a on a.id = assignment_submissions.assignment_id
    where ci.instructor_id = auth.uid() and ci.course_id = a.course_id
  ));

-- ---------------------------------------------------------------------------
-- Progress visibility — fills a pre-existing gap (no admin-wide read policy existed
-- on module_progress or enrollments at all) alongside the new instructor-scoped ones.
-- ---------------------------------------------------------------------------
create policy "Admins see all module progress"
  on public.module_progress for select
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "Instructors see module progress for their courses"
  on public.module_progress for select
  using (exists (
    select 1 from public.course_instructors ci
    join public.course_modules cm on cm.id = module_progress.module_id
    where ci.instructor_id = auth.uid() and ci.course_id = cm.course_id
  ));

create policy "Instructors see chapter progress for their courses"
  on public.chapter_progress for select
  using (exists (
    select 1 from public.course_instructors ci
    join public.chapters c on c.id = chapter_progress.chapter_id
    join public.course_modules cm on cm.id = c.module_id
    where ci.instructor_id = auth.uid() and ci.course_id = cm.course_id
  ));

create policy "Admins see all enrollments"
  on public.enrollments for select
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "Instructors see enrollments for their courses"
  on public.enrollments for select
  using (exists (select 1 from public.course_instructors ci where ci.instructor_id = auth.uid() and ci.course_id = enrollments.course_id));

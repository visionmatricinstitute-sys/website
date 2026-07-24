-- Vision Matrix Institute — Recorded video, Assignments, Quizzes, Attendance schema
-- Run this once in the Supabase project's SQL Editor after 002_live_classes.sql.

-- ---------------------------------------------------------------------------
-- Recorded video per module
-- ---------------------------------------------------------------------------
alter table public.course_modules add column if not exists video_url text;

-- The original schema only granted a public SELECT policy on course_modules —
-- admins had no way to UPDATE it (e.g. to set video_url) until now.
create policy "Admins manage course modules"
  on public.course_modules for all
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'))
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

-- ---------------------------------------------------------------------------
-- Assignments
-- ---------------------------------------------------------------------------
create table public.assignments (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  title text not null,
  description text,
  due_at timestamptz,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);

alter table public.assignments enable row level security;

create policy "Enrolled students see assignments for their courses"
  on public.assignments for select
  using (
    exists (
      select 1 from public.enrollments e
      where e.student_id = auth.uid() and e.course_id = assignments.course_id
    )
  );

create policy "Admins manage assignments"
  on public.assignments for all
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'))
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create table public.assignment_submissions (
  id uuid primary key default gen_random_uuid(),
  assignment_id uuid not null references public.assignments(id) on delete cascade,
  student_id uuid not null references auth.users(id) on delete cascade,
  file_path text not null,
  file_name text not null,
  submitted_at timestamptz not null default now(),
  grade numeric,
  feedback text,
  graded_at timestamptz,
  unique (assignment_id, student_id)
);

alter table public.assignment_submissions enable row level security;

create policy "Students view their own submissions"
  on public.assignment_submissions for select
  using (auth.uid() = student_id);

create policy "Students insert their own submissions"
  on public.assignment_submissions for insert
  with check (auth.uid() = student_id);

create policy "Students update their own ungraded submissions"
  on public.assignment_submissions for update
  using (auth.uid() = student_id and grade is null)
  with check (auth.uid() = student_id);

create policy "Students delete their own ungraded submissions"
  on public.assignment_submissions for delete
  using (auth.uid() = student_id and grade is null);

create policy "Admins view all submissions"
  on public.assignment_submissions for select
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "Admins grade submissions"
  on public.assignment_submissions for update
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

-- Storage bucket for submission files (private — access controlled by policies below)
insert into storage.buckets (id, name, public)
values ('assignment-submissions', 'assignment-submissions', false)
on conflict (id) do nothing;

create policy "Students upload their own submission files"
  on storage.objects for insert
  with check (
    bucket_id = 'assignment-submissions'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Students read their own submission files"
  on storage.objects for select
  using (
    bucket_id = 'assignment-submissions'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Students delete their own submission files"
  on storage.objects for delete
  using (
    bucket_id = 'assignment-submissions'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Admins read all submission files"
  on storage.objects for select
  using (
    bucket_id = 'assignment-submissions'
    and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- ---------------------------------------------------------------------------
-- Quizzes (answer key never exposed to students directly — see function below)
-- ---------------------------------------------------------------------------
create table public.quizzes (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references public.course_modules(id) on delete cascade,
  title text not null,
  created_at timestamptz not null default now()
);

alter table public.quizzes enable row level security;

create policy "Enrolled students see quizzes for their courses"
  on public.quizzes for select
  using (
    exists (
      select 1 from public.course_modules cm
      join public.enrollments e on e.course_id = cm.course_id
      where cm.id = quizzes.module_id and e.student_id = auth.uid()
    )
  );

create policy "Admins manage quizzes"
  on public.quizzes for all
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'))
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create table public.quiz_questions (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid not null references public.quizzes(id) on delete cascade,
  order_index int not null default 0,
  question text not null,
  options jsonb not null,
  correct_index int not null
);

alter table public.quiz_questions enable row level security;

-- Only admins get direct table access (includes the answer key). Students only ever
-- reach questions through get_quiz_for_student(), which never returns correct_index.
create policy "Admins manage quiz questions"
  on public.quiz_questions for all
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'))
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create table public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid not null references public.quizzes(id) on delete cascade,
  student_id uuid not null references auth.users(id) on delete cascade,
  score numeric not null,
  total int not null,
  correct_count int not null,
  attempted_at timestamptz not null default now()
);

alter table public.quiz_attempts enable row level security;

create policy "Students see their own quiz attempts"
  on public.quiz_attempts for select
  using (auth.uid() = student_id);

create policy "Admins see all quiz attempts"
  on public.quiz_attempts for select
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

-- Returns quiz questions for an enrolled student, WITHOUT the correct_index answer key.
create or replace function public.get_quiz_for_student(p_quiz_id uuid)
returns table (id uuid, order_index int, question text, options jsonb)
language plpgsql
security definer
set search_path = public
as $$
begin
  if not exists (
    select 1 from public.quizzes q
    join public.course_modules cm on cm.id = q.module_id
    join public.enrollments e on e.course_id = cm.course_id
    where q.id = p_quiz_id and e.student_id = auth.uid()
  ) then
    raise exception 'Not enrolled in this quiz''s course';
  end if;

  return query
    select qq.id, qq.order_index, qq.question, qq.options
    from public.quiz_questions qq
    where qq.quiz_id = p_quiz_id
    order by qq.order_index;
end;
$$;

grant execute on function public.get_quiz_for_student(uuid) to authenticated;

-- Grades a submitted attempt server-side (the only place the answer key is ever read)
-- and records it. p_answers is a JSON object keyed by question id -> selected option index.
create or replace function public.submit_quiz_attempt(p_quiz_id uuid, p_answers jsonb)
returns table (score numeric, total int, correct_count int)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_total int;
  v_correct int;
  v_score numeric;
begin
  if not exists (
    select 1 from public.quizzes q
    join public.course_modules cm on cm.id = q.module_id
    join public.enrollments e on e.course_id = cm.course_id
    where q.id = p_quiz_id and e.student_id = auth.uid()
  ) then
    raise exception 'Not enrolled in this quiz''s course';
  end if;

  select count(*) into v_total from public.quiz_questions where quiz_id = p_quiz_id;

  select count(*) into v_correct
  from public.quiz_questions qq
  where qq.quiz_id = p_quiz_id
    and (p_answers ->> qq.id::text)::int = qq.correct_index;

  v_score := case when v_total > 0 then round((v_correct::numeric / v_total) * 100, 1) else 0 end;

  insert into public.quiz_attempts (quiz_id, student_id, score, total, correct_count)
  values (p_quiz_id, auth.uid(), v_score, v_total, v_correct);

  return query select v_score, v_total, v_correct;
end;
$$;

grant execute on function public.submit_quiz_attempt(uuid, jsonb) to authenticated;

-- ---------------------------------------------------------------------------
-- Attendance (logged when a student clicks Join Class from the dashboard —
-- confirms join-intent from our system, not that they stayed in the Zoom call)
-- ---------------------------------------------------------------------------
create table public.attendance (
  id uuid primary key default gen_random_uuid(),
  live_class_id uuid not null references public.live_classes(id) on delete cascade,
  student_id uuid not null references auth.users(id) on delete cascade,
  joined_at timestamptz not null default now(),
  unique (live_class_id, student_id)
);

alter table public.attendance enable row level security;

create policy "Students log and see their own attendance"
  on public.attendance for all
  using (auth.uid() = student_id)
  with check (auth.uid() = student_id);

create policy "Admins see all attendance"
  on public.attendance for select
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

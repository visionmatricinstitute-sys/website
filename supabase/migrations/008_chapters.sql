-- Vision Matrix Institute — Chapter-level module structure with real sequential unlocking
-- Run this once in the Supabase project's SQL Editor after 007_admission_newsletter_requests.sql.
--
-- Also captures resources.module_id, which was added by hand earlier (2026-08-08) and was
-- never recorded in a migration file — this migration is idempotent on that column so it's
-- safe to run even though the column may already exist.

-- ---------------------------------------------------------------------------
-- Reconcile drift: resources.module_id (added by hand previously, not in any migration)
-- ---------------------------------------------------------------------------
alter table public.resources add column if not exists module_id uuid references public.course_modules(id) on delete cascade;

-- ---------------------------------------------------------------------------
-- Chapters — a module is now made of one or more chapters, each with its own video
-- ---------------------------------------------------------------------------
create table public.chapters (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references public.course_modules(id) on delete cascade,
  order_index int not null default 0,
  title text not null,
  video_url text
);

alter table public.chapters enable row level security;

create policy "Chapters are public" on public.chapters for select using (true);

create policy "Admins manage chapters"
  on public.chapters for all
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'))
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

-- ---------------------------------------------------------------------------
-- Chapter progress — mirrors module_progress, but writes go through the app's
-- sequential-unlock checks (see markChapterComplete server action), not raw client writes.
-- ---------------------------------------------------------------------------
create table public.chapter_progress (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references auth.users(id) on delete cascade,
  chapter_id uuid not null references public.chapters(id) on delete cascade,
  status text not null default 'not_started' check (status in ('not_started', 'completed')),
  completed_at timestamptz,
  unique (student_id, chapter_id)
);

alter table public.chapter_progress enable row level security;

create policy "Students manage their own chapter progress"
  on public.chapter_progress for all
  using (auth.uid() = student_id)
  with check (auth.uid() = student_id);

create policy "Admins see all chapter progress"
  on public.chapter_progress for select
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

-- ---------------------------------------------------------------------------
-- Lock down module_progress: no longer student-togglable at will (the bug this
-- migration fixes — previously any module could be marked "completed" with zero
-- regard for chapters watched or quiz score). Module completion is now written
-- only by complete_module_if_passed() below, once the module's quiz is passed.
-- ---------------------------------------------------------------------------
drop policy if exists "Students manage their own progress" on public.module_progress;

create policy "Students view their own module progress"
  on public.module_progress for select
  using (auth.uid() = student_id);

-- ---------------------------------------------------------------------------
-- Grades a quiz attempt (existing submit_quiz_attempt, unchanged) and, if the
-- score clears 60%, marks that module completed — which is what unlocks the
-- next module's first chapter (see markChapterComplete's sequencing check).
-- ---------------------------------------------------------------------------
create or replace function public.complete_module_if_passed(p_quiz_id uuid, p_score numeric)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_module_id uuid;
begin
  if p_score < 60 then
    return false;
  end if;

  select module_id into v_module_id from public.quizzes where id = p_quiz_id;
  if v_module_id is null then
    return false;
  end if;

  insert into public.module_progress (student_id, module_id, status, completed_at)
  values (auth.uid(), v_module_id, 'completed', now())
  on conflict (student_id, module_id)
    do update set status = 'completed', completed_at = now();

  return true;
end;
$$;

grant execute on function public.complete_module_if_passed(uuid, numeric) to authenticated;

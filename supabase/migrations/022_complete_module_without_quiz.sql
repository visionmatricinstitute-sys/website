-- A module with no quiz can never be completed through complete_module_if_passed(), which
-- would leave every later module locked. Founder decision (2026-10-07): such a module is
-- marked complete automatically once the student has completed every chapter in it.
--
-- Safety notes:
--   * The trigger writes only for NEW.student_id of the chapter_progress row. Students can
--     only write their own chapter_progress rows (RLS), so they cannot complete modules for
--     anyone else.
--   * A module that has a quiz is never auto-completed: the 60% pass rule still applies.
--   * The student must be enrolled in the module's course (same rule as the quiz functions).
--   * Nothing client-supplied (such as a score) is trusted.

create or replace function public.complete_module_if_no_quiz()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_module_id uuid;
  v_course_id uuid;
begin
  if new.status is distinct from 'completed' then
    return new;
  end if;

  select ch.module_id, cm.course_id
    into v_module_id, v_course_id
    from public.chapters ch
    join public.course_modules cm on cm.id = ch.module_id
   where ch.id = new.chapter_id;

  if v_module_id is null then
    return new;
  end if;

  -- Modules with a quiz are completed only by passing it.
  if exists (select 1 from public.quizzes q where q.module_id = v_module_id) then
    return new;
  end if;

  if not exists (
    select 1 from public.enrollments e
     where e.course_id = v_course_id and e.student_id = new.student_id
  ) then
    return new;
  end if;

  -- Every chapter of the module must be completed by this student.
  if exists (
    select 1 from public.chapters ch2
     where ch2.module_id = v_module_id
       and not exists (
         select 1 from public.chapter_progress cp
          where cp.chapter_id = ch2.id
            and cp.student_id = new.student_id
            and cp.status = 'completed'
       )
  ) then
    return new;
  end if;

  insert into public.module_progress (student_id, module_id, status, completed_at)
  values (new.student_id, v_module_id, 'completed', now())
  on conflict (student_id, module_id)
    do update set status = 'completed', completed_at = coalesce(public.module_progress.completed_at, now());

  return new;
end;
$$;

revoke execute on function public.complete_module_if_no_quiz() from public, anon, authenticated;

drop trigger if exists on_chapter_progress_complete_module on public.chapter_progress;
create trigger on_chapter_progress_complete_module
  after insert or update of status on public.chapter_progress
  for each row execute function public.complete_module_if_no_quiz();

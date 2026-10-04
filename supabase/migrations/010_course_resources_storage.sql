-- Vision Matrix Institute — Course resource uploads (Storage-backed)
-- Run this once in the Supabase project's SQL Editor after 009_course_authoring.sql.
--
-- Today `resources.file_url` is a plain external URL, hand-seeded — there is no admin UI
-- to upload a PDF/Excel/etc and no access control on it (public-read policy, and the
-- URL itself is publicly reachable regardless). This migration adds Storage-backed
-- uploads gated to enrolled students, following the exact bucket/policy pattern already
-- proven for assignment-submissions in 003_content_assignments_quizzes_attendance.sql.
-- The existing hand-seeded resources (file_url pointing at public/toolkit/*.html) are
-- untouched — they keep working exactly as they do today.

alter table public.resources alter column file_url drop not null;
alter table public.resources add column if not exists file_path text;
alter table public.resources add column if not exists file_name text;

-- The original schema only granted a public SELECT policy on resources — admins had no
-- way to INSERT/UPDATE/DELETE it until now.
create policy "Admins manage resources"
  on public.resources for all
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'))
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

-- Storage bucket for admin-uploaded course material (private — access controlled by policies below)
insert into storage.buckets (id, name, public)
values ('course-resources', 'course-resources', false)
on conflict (id) do nothing;

-- Objects are stored at {course_id}/{module_id-or-'course'}/{timestamp}-{filename}, so
-- (storage.foldername(name))[1] is always the course_id.
create policy "Enrolled students read course resource files"
  on storage.objects for select
  using (
    bucket_id = 'course-resources'
    and exists (
      select 1 from public.enrollments e
      where e.student_id = auth.uid()
        and e.course_id::text = (storage.foldername(name))[1]
    )
  );

create policy "Admins manage course resource files"
  on storage.objects for all
  using (
    bucket_id = 'course-resources'
    and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  )
  with check (
    bucket_id = 'course-resources'
    and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

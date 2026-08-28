-- Vision Matrix Institute — Certificate verification
-- Run this once in the Supabase project's SQL Editor after 010_course_resources_storage.sql.
--
-- Certificates already auto-issue (see check_course_completion() in schema.sql) but there is
-- no way for anyone — including the student who earned it — to look one up by code. The public
-- verification page needs to read a certificate's student name + course title without a public
-- SELECT policy on `certificates` or `profiles` (which would leak every certificate/profile in
-- the system) — same "security definer, minimal return shape" pattern already used for
-- get_quiz_for_student() and submit_quiz_attempt() in 003_content_assignments_quizzes_attendance.sql.

create or replace function public.verify_certificate(p_code text)
returns table (student_name text, course_title text, issued_at timestamptz, certificate_code text)
language plpgsql
security definer
set search_path = public
as $$
begin
  return query
    select p.full_name, c.title, cert.issued_at, cert.certificate_code
    from public.certificates cert
    join public.profiles p on p.id = cert.student_id
    join public.courses c on c.id = cert.course_id
    where cert.certificate_code = p_code;
end;
$$;

-- Public verification page is unauthenticated — anon must be able to call this.
grant execute on function public.verify_certificate(text) to anon, authenticated;

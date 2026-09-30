-- 018_drop_self_enroll_policy.sql
-- APPLIED to the live Supabase project on 2026-09-27 with the Founder's go-ahead
-- (migration 'drop_student_self_enroll_policy'). Mirrors supabase/migrations/018_drop_self_enroll_policy.sql
-- in the website repo. Tested first in a rolled-back transaction: a signed-in student can no longer insert
-- their own enrolment; an admin can still enrol; the server-side insert used after a verified payment still works.
--
-- Enrolment now happens only (a) on the server after a verified Razorpay payment (service role, bypasses RLS)
-- and (b) by an admin in /admin/enrollments (policy "Admins manage enrollments").

drop policy "Students can enroll themselves" on public.enrollments;

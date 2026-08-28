-- Vision Matrix Institute — Student roster + manual enrollment admin
-- Run this once in the Supabase project's SQL Editor after 011_certificate_verification.sql.
--
-- Two RLS gaps this fixes: `profiles` only ever had an "owner can see their own row" policy,
-- so an admin querying it for a roster page got back just their own profile — nothing else.
-- `enrollments` had no admin policy at all (only "students see/insert their own"), so there
-- was no way for an admin to manually enroll or remove a student. Same "Admins manage X"
-- idiom used everywhere else in this schema.

create policy "Admins view all profiles"
  on public.profiles for select
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "Admins manage enrollments"
  on public.enrollments for all
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'))
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

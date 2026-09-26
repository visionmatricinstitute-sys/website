-- Vision Matrix Institute — Student roster + manual enrollment admin
-- NOT YET APPLIED to the live database (as of 2026-09-27). Apply this, then merge the code.
--
-- Two gaps this fixes: `profiles` only had an "owner can see their own row" policy, so an admin
-- querying it for a roster got back only their own profile; `enrollments` had no admin policy,
-- so an admin could not manually enroll or remove a student.
--
-- CORRECTION (2026-09-27): the first version of this file wrote the admin check as a subquery on
-- `profiles` inside a policy ON `profiles`. Tested against the live schema in a rolled-back
-- transaction, that fails for every user with "infinite recursion detected in policy for
-- relation profiles", which would have broken every sign-in. The check now goes through a
-- SECURITY DEFINER function, which reads `profiles` without re-entering the policy.
-- Tested (rolled back): a student sees only their own profile, an admin sees all, a student
-- cannot enrol someone else or delete others' enrolments, an admin can enrol and remove.

create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

revoke all on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;

create policy "Admins view all profiles"
  on public.profiles for select
  using (public.is_admin());

create policy "Admins manage enrollments"
  on public.enrollments for all
  using (public.is_admin())
  with check (public.is_admin());

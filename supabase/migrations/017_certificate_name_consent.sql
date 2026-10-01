-- 017_certificate_name_consent.sql (same SQL as the VMI OS repo file 0004)
-- APPLIED to the live Supabase project on 2026-09-26 as migration 'certificates_student_name_consent_toggle'.
-- Lets the certificate's own student switch public display of their name on or off (only for a 'valid'
-- certificate of theirs). Tested in a rolled-back transaction: on shows the name, off withholds it, another
-- user is blocked, and a student sees their own valid certificate but not a revoked one.

create or replace function public.set_certificate_name_consent(p_certificate_id uuid, p_consent boolean)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_count int;
begin
  if auth.uid() is null then
    raise exception 'Sign in required';
  end if;
  update public.certificates
     set public_name_consent = p_consent
   where id = p_certificate_id
     and student_id = auth.uid()
     and status = 'valid';
  get diagnostics v_count = row_count;
  if v_count = 0 then
    raise exception 'No valid certificate of yours found with that ID';
  end if;
  return p_consent;
end;
$$;

revoke all on function public.set_certificate_name_consent(uuid, boolean) from public, anon;
grant execute on function public.set_certificate_name_consent(uuid, boolean) to authenticated;

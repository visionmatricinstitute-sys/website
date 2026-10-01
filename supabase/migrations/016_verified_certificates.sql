-- 016_verified_certificates.sql (same SQL as the VMI OS repo file 0003)
-- APPLIED to the live Supabase project (nbporvkldcelfycjyebz) on 2026-09-26 with the Founder's go-ahead,
-- as migration 'certificates_verified_approval_and_public_verify' (without the begin/commit lines, which the
-- migration runner supplies). Tested the same day inside a transaction that was rolled back: non-admin approve
-- blocked, approve without a paid payment blocked unless overridden, ID format VMI-YYYY-XXXXXXXX, anonymous
-- verify works and withholds the name without consent, unknown ID returns nothing, anonymous cannot read the
-- table or call approve, revoke works. Design: 03-ARCHITECTURE/Certificates.md.
--
-- What it does:
--   1. Adds status / snapshot / consent columns to public.certificates.
--      Because `status` defaults to 'pending_approval', the existing trigger check_course_completion()
--      (which inserts a bare row when all modules are complete) now creates a PENDING row, not a valid one.
--   2. Students can only see certificates that are approved ('valid') or revoked, not pending ones.
--   3. approve_certificate(): admin-only; assigns an ID, snapshots the name/course/hours, checks a paid payment
--      exists unless overridden.
--   4. revoke_certificate(): admin-only.
--   5. verify_certificate(): public, exact-match lookup by certificate number; returns the name only if the
--      holder consented.

begin;

alter table public.certificates
  add column if not exists certificate_number text,
  add column if not exists recipient_name text,
  add column if not exists course_title text,
  add column if not exists course_hours integer,
  add column if not exists status text not null default 'pending_approval',
  add column if not exists public_name_consent boolean not null default false,
  add column if not exists payment_override boolean not null default false,
  add column if not exists approved_by uuid references auth.users(id),
  add column if not exists approved_at timestamptz,
  add column if not exists revoked_at timestamptz,
  add column if not exists revoked_reason text;

alter table public.certificates
  add constraint certificates_status_check check (status in ('pending_approval', 'valid', 'revoked'));

create unique index if not exists certificates_certificate_number_key
  on public.certificates (certificate_number) where certificate_number is not null;

-- Existing rows (1 test row on 2026-09-26) become pending. Nothing is auto-approved.

-- Students see only approved or revoked certificates, never pending ones.
drop policy if exists "Students see their own certificates" on public.certificates;
create policy "Students see their own certificates"
  on public.certificates for select
  using (auth.uid() = student_id and status in ('valid', 'revoked'));

-- Admins can see every certificate (including pending) for review.
create policy "Admins see all certificates"
  on public.certificates for select
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

-- Certificate number: VMI-<year>-<8 random characters>, no look-alike characters (no 0/O/1/I).
create or replace function public.generate_certificate_number()
returns text
language plpgsql
volatile
set search_path = public, extensions
as $$
declare
  alphabet constant text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  bytes bytea;
  result text := '';
  i int;
  candidate text;
begin
  loop
    bytes := gen_random_bytes(8);
    result := '';
    for i in 0..7 loop
      result := result || substr(alphabet, (get_byte(bytes, i) % length(alphabet)) + 1, 1);
    end loop;
    candidate := 'VMI-' || to_char(now(), 'YYYY') || '-' || result;
    exit when not exists (select 1 from public.certificates where certificate_number = candidate);
  end loop;
  return candidate;
end;
$$;

-- Approve: admin only. p_course_hours is supplied by the caller (not hard-coded here).
create or replace function public.approve_certificate(
  p_certificate_id uuid,
  p_recipient_name text,
  p_course_hours integer,
  p_public_name_consent boolean default false,
  p_payment_override boolean default false
)
returns text
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_row public.certificates%rowtype;
  v_title text;
  v_number text;
begin
  if not exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin') then
    raise exception 'Only an admin can approve certificates';
  end if;

  select * into v_row from public.certificates where id = p_certificate_id for update;
  if not found then raise exception 'Certificate not found'; end if;
  if v_row.status <> 'pending_approval' then raise exception 'Certificate is not pending approval'; end if;
  if coalesce(trim(p_recipient_name), '') = '' then raise exception 'Recipient name is required'; end if;

  if not p_payment_override and not exists (
    select 1 from public.payments pay
    where pay.student_id = v_row.student_id and pay.course_id = v_row.course_id and pay.status = 'paid'
  ) then
    raise exception 'No paid payment found for this student and course; approve with p_payment_override = true only if payment was taken another way';
  end if;

  select title into v_title from public.courses where id = v_row.course_id;
  v_number := public.generate_certificate_number();

  update public.certificates
     set certificate_number = v_number,
         recipient_name = trim(p_recipient_name),
         course_title = v_title,
         course_hours = p_course_hours,
         public_name_consent = p_public_name_consent,
         payment_override = p_payment_override,
         status = 'valid',
         approved_by = auth.uid(),
         approved_at = now()
   where id = p_certificate_id;

  return v_number;
end;
$$;

create or replace function public.revoke_certificate(p_certificate_id uuid, p_reason text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin') then
    raise exception 'Only an admin can revoke certificates';
  end if;
  update public.certificates
     set status = 'revoked', revoked_at = now(), revoked_reason = p_reason
   where id = p_certificate_id and status = 'valid';
end;
$$;

-- Public verification: exact match on the certificate number only. No listing, no search.
-- The holder's name is returned only if they consented.
create or replace function public.verify_certificate(p_number text)
returns table (
  certificate_number text,
  recipient_name text,
  course_title text,
  course_hours integer,
  issued_on date,
  status text
)
language sql
security definer
stable
set search_path = public
as $$
  select c.certificate_number,
         case when c.public_name_consent then c.recipient_name else null end,
         c.course_title,
         c.course_hours,
         c.approved_at::date,
         c.status
    from public.certificates c
   where c.certificate_number = upper(trim(p_number))
     and c.status in ('valid', 'revoked');
$$;

revoke all on function public.generate_certificate_number() from public, anon, authenticated;
revoke all on function public.approve_certificate(uuid, text, integer, boolean, boolean) from public, anon;
revoke all on function public.revoke_certificate(uuid, text) from public, anon;
grant execute on function public.approve_certificate(uuid, text, integer, boolean, boolean) to authenticated;
grant execute on function public.revoke_certificate(uuid, text) to authenticated;
grant execute on function public.verify_certificate(text) to anon, authenticated;

commit;

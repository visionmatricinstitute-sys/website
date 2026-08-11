-- Vision Matrix Institute — Razorpay payments schema
-- Run this once in the Supabase project's SQL Editor after 003_content_assignments_quizzes_attendance.sql.

-- Courses had no price at all — the checkout flow needs a single source of
-- truth for what a course costs instead of hardcoding it in frontend/API code.
alter table public.courses add column if not exists price_amount integer; -- in paise
alter table public.courses add column if not exists price_currency text not null default 'INR';

update public.courses
set price_amount = 3490000 -- ₹34,900
where slug = 'electrical-design-data-center' and price_amount is null;

-- ---------------------------------------------------------------------------
-- Payments
-- ---------------------------------------------------------------------------
-- One row per Razorpay order attempt. A student can have multiple rows for
-- the same course (e.g. an abandoned/failed attempt followed by a successful
-- one) — status tracks which one actually went through.
create table public.payments (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references auth.users(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  razorpay_order_id text not null unique,
  razorpay_payment_id text,
  amount integer not null, -- in paise, snapshot at order-creation time
  currency text not null default 'INR',
  coupon_code text,
  status text not null default 'created' check (status in ('created', 'paid', 'failed')),
  created_at timestamptz not null default now(),
  paid_at timestamptz
);

create index payments_student_idx on public.payments (student_id);

alter table public.payments enable row level security;

-- Students can see their own payment history (receipts, order status) —
-- but never insert/update it directly. Every write to this table happens
-- through the server-side API routes using the service-role key, because
-- "payment succeeded" must only ever be set after Razorpay's signature is
-- cryptographically verified server-side — no RLS policy can express that
-- condition, so this is the one table in this schema that deliberately
-- bypasses the "admins via profiles.role" RLS pattern used everywhere else.
create policy "Students view own payments"
  on public.payments for select
  using (student_id = auth.uid());

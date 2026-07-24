-- Vision Matrix Institute — Student Dashboard schema
-- Run this once in the Supabase project's SQL Editor (Dashboard > SQL Editor > New query).

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Profiles (one row per student, auto-created on signup)
-- ---------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  track text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Profiles are viewable by owner"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Profiles are editable by owner"
  on public.profiles for update
  using (auth.uid() = id);

create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$ language plpgsql security definer set search_path = public;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Courses & modules (public read — this is the catalogue)
-- ---------------------------------------------------------------------------
create table public.courses (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text,
  created_at timestamptz not null default now()
);

alter table public.courses enable row level security;
create policy "Courses are public" on public.courses for select using (true);

create table public.course_modules (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  order_index int not null,
  module_number text,
  title text not null,
  hours text,
  focus text
);

alter table public.course_modules enable row level security;
create policy "Modules are public" on public.course_modules for select using (true);

-- ---------------------------------------------------------------------------
-- Enrollments & per-module progress (private — student owns their own rows)
-- ---------------------------------------------------------------------------
create table public.enrollments (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references auth.users(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  enrolled_at timestamptz not null default now(),
  unique (student_id, course_id)
);

alter table public.enrollments enable row level security;

create policy "Students see their own enrollments"
  on public.enrollments for select
  using (auth.uid() = student_id);

create policy "Students can enroll themselves"
  on public.enrollments for insert
  with check (auth.uid() = student_id);

create table public.module_progress (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references auth.users(id) on delete cascade,
  module_id uuid not null references public.course_modules(id) on delete cascade,
  status text not null default 'not_started' check (status in ('not_started', 'in_progress', 'completed')),
  completed_at timestamptz,
  unique (student_id, module_id)
);

alter table public.module_progress enable row level security;

create policy "Students manage their own progress"
  on public.module_progress for all
  using (auth.uid() = student_id)
  with check (auth.uid() = student_id);

-- ---------------------------------------------------------------------------
-- Certificates — issued automatically when every module in a course is complete
-- ---------------------------------------------------------------------------
create table public.certificates (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references auth.users(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  certificate_code text unique not null default encode(gen_random_bytes(6), 'hex'),
  issued_at timestamptz not null default now(),
  unique (student_id, course_id)
);

alter table public.certificates enable row level security;

create policy "Students see their own certificates"
  on public.certificates for select
  using (auth.uid() = student_id);

create function public.check_course_completion()
returns trigger as $$
declare
  v_course_id uuid;
  v_total int;
  v_completed int;
begin
  select course_id into v_course_id from public.course_modules where id = new.module_id;

  select count(*) into v_total from public.course_modules where course_id = v_course_id;
  select count(*) into v_completed
    from public.module_progress mp
    join public.course_modules cm on cm.id = mp.module_id
    where cm.course_id = v_course_id
      and mp.student_id = new.student_id
      and mp.status = 'completed';

  if v_total > 0 and v_completed >= v_total then
    insert into public.certificates (student_id, course_id)
    values (new.student_id, v_course_id)
    on conflict (student_id, course_id) do nothing;
  end if;

  return new;
end;
$$ language plpgsql security definer set search_path = public;

create trigger on_module_progress_change
  after insert or update on public.module_progress
  for each row execute procedure public.check_course_completion();

-- ---------------------------------------------------------------------------
-- Downloadable resources (public read, scoped to a course)
-- ---------------------------------------------------------------------------
create table public.resources (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references public.courses(id) on delete cascade,
  title text not null,
  file_url text not null,
  resource_type text not null default 'pdf'
);

alter table public.resources enable row level security;
create policy "Resources are public" on public.resources for select using (true);

-- ---------------------------------------------------------------------------
-- Seed: the real Electrical Design — Data Center Specialist program
-- (mirrors lib/program-data.ts PROGRAM_MODULES on the marketing site)
-- ---------------------------------------------------------------------------
insert into public.courses (slug, title, description) values
  (
    'electrical-design-data-center',
    'Electrical Design – Data Center Specialist',
    'AI-first electrical design for mission-critical facilities — from tier classification to L5 commissioning, anchored in current IEC/IEEE/Uptime standards.'
  );

insert into public.course_modules (course_id, order_index, module_number, title, hours, focus)
select id, 1, '01', 'Tier Classification & Reliability', '16h', 'Uptime, TIA-942, SPOF, N/N+1/2N' from public.courses where slug = 'electrical-design-data-center'
union all select id, 2, '02', 'Electrical Fundamentals', '20h', 'AC theory, per-unit, harmonics, earthing basics' from public.courses where slug = 'electrical-design-data-center'
union all select id, 3, '03', 'Power Distribution Architectures', '24h', 'Radial, ring bus, block, distributed redundancy' from public.courses where slug = 'electrical-design-data-center'
union all select id, 4, '04', 'MV Systems & Substations', '24h', 'Transformers, MV switchgear, substation design' from public.courses where slug = 'electrical-design-data-center'
union all select id, 5, '05', 'UPS Systems & Battery Sizing', '24h', 'Static UPS, battery sizing (IEEE 485), STS' from public.courses where slug = 'electrical-design-data-center'
union all select id, 6, '06', 'Standby Generation & Fuel Systems', '20h', 'Generator sizing, paralleling, day tanks, bulk fuel' from public.courses where slug = 'electrical-design-data-center'
union all select id, 7, '07', 'Protection Engineering', '22h', 'Relay setting, coordination, ETAP/DIgSILENT' from public.courses where slug = 'electrical-design-data-center'
union all select id, 8, '08', 'Short Circuit, Arc Flash & Power Quality', '22h', 'IEC 60909, IEEE 1584, IEEE 519 harmonic studies' from public.courses where slug = 'electrical-design-data-center'
union all select id, 9, '09', 'Earthing, Bonding & LPS', '18h', 'IEEE 80, IEC 62305, TN-S/TN-C-S, SPD selection' from public.courses where slug = 'electrical-design-data-center'
union all select id, 10, '10', 'Load Calculations & Cable Sizing', '20h', 'Load lists, cable sizing, voltage drop, derating' from public.courses where slug = 'electrical-design-data-center'
union all select id, 11, '11', 'LV Switchgear, PDU & Busway Design', '20h', 'IEC 61439 Forms, PDU/RPDU, busway systems' from public.courses where slug = 'electrical-design-data-center'
union all select id, 12, '12', 'Electrical Rooms & Cable Management', '18h', 'Room layouts, containment, trays, coordination' from public.courses where slug = 'electrical-design-data-center'
union all select id, 13, '13', 'Documentation, Vendor Engineering', '18h', 'Specs, BOQ, TBE, vendor drawings, procurement' from public.courses where slug = 'electrical-design-data-center'
union all select id, 14, '14', 'BIM, Testing & Commissioning', '22h', 'Revit MEP, Navisworks, FAT/SAT, L1-L5' from public.courses where slug = 'electrical-design-data-center';

insert into public.resources (course_id, title, file_url, resource_type)
select id, 'Electrical Power System & Lighting Design Reference', '/toolkit/electrical-design-reference-guide.html', 'guide'
from public.courses where slug = 'electrical-design-data-center'
union all
select id, 'Electrical Formula Cheat Sheet', '/toolkit/electrical-formula-sheet.html', 'formula-sheet'
from public.courses where slug = 'electrical-design-data-center';

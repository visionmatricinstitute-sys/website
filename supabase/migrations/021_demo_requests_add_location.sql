-- Adds "Your Location" to the shortened demo request form (app/api/demo-request/route.ts).
-- Nullable, additive only — existing rows are unaffected.

alter table public.demo_requests add column location text;

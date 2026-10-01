-- Vision Matrix Institute — price AutoCAD and BIM so they're individually
-- enrollable/payable, same as the flagship Electrical Design course.
--
-- NOT YET APPLIED to the live Supabase project — attempting to run this
-- directly was blocked by a safety permission on this session; the Founder
-- (or someone with dashboard access) needs to run it in the Supabase SQL
-- Editor. Once applied, /checkout/autocad-training and
-- /checkout/bim-revit-training start working automatically (the checkout
-- page already 404s cleanly for any course with no price_amount set, so
-- nothing is broken in the meantime — those two courses' "Enroll & Pay"
-- buttons just won't appear on the live site until this runs).
--
-- Prices per the Founder, 2026-09-26 (see FOUNDER-ACTION-ITEMS.md item #20):
-- AutoCAD ₹10,000, Electrical BIM (Revit MEP) ₹30,000. Slugs match the
-- existing /programs/autocad-training and /programs/bim-revit-training
-- pages exactly, and the "Popular Courses" card hrefs in
-- components/courses-section.tsx, so /checkout/<slug> resolves correctly
-- for both once these rows exist.
--
-- Also worth noting: migration 018 (drop_student_self_enroll_policy) was
-- applied to the live project on 2026-09-27 but its file was never
-- committed here — it's recorded instead at
-- packages/database/migrations/0006_drop_self_enroll_policy.sql in the
-- parent VMI-OS repo. This migration is numbered 019 to avoid colliding
-- with that gap, not because 018 is present in this folder.

insert into public.courses (slug, title, description, price_amount, price_currency)
values
  (
    'autocad-training',
    'AutoCAD Training – 2D Drafting & 3D Modeling',
    'Professional AutoCAD training covering 2D drafting and 3D modeling for engineering, architecture, and design applications. Live online, instructor-led.',
    1000000, -- Rs 10,000 in paise
    'INR'
  ),
  (
    'bim-revit-training',
    'BIM Training with Revit MEP',
    'Advanced BIM training with Revit MEP focusing on building information modeling for construction and engineering projects.',
    3000000, -- Rs 30,000 in paise
    'INR'
  )
on conflict (slug) do nothing;

# LMS Implementation Plan — Vision Matrix Institute

**Status:** Living document. Written after a full inspection of the existing codebase (2026-08-28). This is not a from-scratch LMS proposal — a substantial, working LMS already exists in this repo. This plan identifies what's real today, what's genuinely missing, and the order in which to build the gaps without breaking what already works.

## 1. Existing stack

- **Framework:** Next.js 15.2.8 (App Router), React 19, TypeScript (strict mode).
- **Database/Auth:** Supabase (Postgres + Supabase Auth), accessed via `@supabase/ssr`. Three client constructors: `lib/supabase/client.ts` (browser), `lib/supabase/server.ts` (SSR, cookie-bound), `lib/supabase/service.ts` (service-role, bypasses RLS — trusted server code only).
- **UI:** Tailwind CSS v4 + shadcn/ui (`new-york` style, ~40 generated components in `components/ui/`).
- **Payments:** Razorpay — live, working (order creation, signature verification, webhook fallback).
- **Video conferencing:** Zoom API (`lib/zoom.ts`) for scheduled live classes — separate from course video content.
- **CRM sync:** Google Sheets (`lib/google-sheets.ts`) for admission/demo/lead-magnet form captures.
- **Hosting:** Vercel, auto-synced from v0.app. No Node/npm available in this working environment — all build/lint/type verification happens via the Vercel preview build on push, not locally.
- **Video hosting:** None of our own — `chapters.video_url` / `course_modules.video_url` are plain text fields holding a YouTube or Vimeo URL (or any direct file URL), rendered via `lib/video-embed.ts`'s `getEmbedUrl()`. This matches the earlier decision (this session) to use YouTube Unlisted for course videos rather than self-hosting.

## 2. Existing architecture — what's already real, not planned

This is the part worth stating plainly before proposing anything new: **courses → modules → chapters → quizzes → assignments → enrollments → certificates is a coherent, working vertical slice**, not scaffolding.

- **Course structure:** `courses` → `course_modules` → `chapters`, each chapter carrying its own video.
- **Sequential unlocking is fully implemented, server-revalidated:** module *n* unlocks only once module *n-1* is `completed`; within a module, chapter *n* unlocks only once chapter *n-1* is `completed`. The "mark chapter watched" action (`app/dashboard/actions.ts:27-98`) re-checks this server-side before writing — it cannot be bypassed by calling the action directly, only the UI additionally hides locked content.
- **Module completion is quiz-gated, not self-toggled:** a module flips to `completed` only via `complete_module_if_passed()` (a `security definer` RPC), which requires a quiz score ≥ 60%. Students cannot write `module_progress` to `completed` directly — that RLS path was deliberately closed in migration `008_chapters.sql`.
- **Quizzes hide their answer key:** `quiz_questions` is admin-only at the RLS layer; students reach questions only through `get_quiz_for_student()` (strips `correct_index`), and grading happens server-side in `submit_quiz_attempt()`.
- **Payments are live, not a stub:** Razorpay order creation, signature-verified confirmation, and an independent webhook fallback (source of truth in case the browser-side verify call never fires) are all implemented and wired to `enrollments`.
- **Certificates auto-issue:** a DB trigger (`check_course_completion()`) inserts a `certificates` row the moment every module in a course reaches `completed` for a student — no manual issuance step needed.
- **RBAC pattern is consistent and sound:** `profiles.role` (`'student' | 'admin'`), enforced in `app/admin/layout.tsx` (redirects non-admins) on top of `middleware.ts` (login-only gate) on top of RLS's `"Admins manage X"` policy idiom (`exists (select 1 from profiles where id = auth.uid() and role = 'admin')`). Three independent layers — this is the pattern every new admin feature below should reuse exactly.

**Implication for this plan:** nothing above should be rebuilt, refactored, or routed around. Every new piece plugs into this existing model.

## 3. What's genuinely missing (the real gap list)

Confirmed absent by direct inspection, not assumption:

1. **No course-authoring UI.** `courses` and `course_modules` (create) can only be populated by hand-written SQL — there is no `app/admin/courses/`. This is the most foundational gap: VMI cannot add a new course today without an engineer running SQL.
2. **No resource-upload UI, and `resources.file_url` is a plain external URL, not Storage-backed.** No admin route exists to attach a PDF/Excel to a module or chapter; the only two resource rows in the system are hand-seeded. The only real file-upload flow in the repo is assignment submissions (private Storage bucket, working).
3. **No certificate rendering or verification page.** Certificates exist only as a DB row + a plain-text code shown on the dashboard. No PDF/branded certificate, no `/certificates/[code]` public verification route.
4. **No student/enrollment admin visibility.** No roster page, no way for an admin to see or manage who's enrolled in what, no manual enrollment/un-enrollment UI (the one manual-enrollment server action exists but nothing in the UI calls it).
5. **No instructor role.** Only `student`/`admin` exist in the schema; every "instructor" the admin panel currently shows is really just "admin."
6. **No notifications/announcements system.** Confirmed absent end-to-end (schema, admin UI, student UI).
7. **No audit log.** No table, no logging utility anywhere.
8. **No search/filtering anywhere in the admin panel.** All admin lists are unfiltered, unpaginated `.order()` queries.
9. **Partial admin CRUD on existing entities:** modules have no create/delete UI (video-URL edit only), quizzes have no edit/delete UI (create-only), assignments have no edit/delete UI (create + grade only).
10. **Legacy dead field:** `course_modules.video_url` is still editable in `app/admin/modules/page.tsx` but the student page only ever renders chapter-level video — this field is effectively dead and should be either wired up as a fallback or removed from the admin form, not left as a confusing no-op.

## 4. Recommended LMS architecture (extend, don't replace)

No framework, database, or auth change is warranted — the existing stack handles everything the outstanding gaps need. Concretely:

- **Course authoring:** new `app/admin/courses/` route following the exact CRUD shape already proven in `app/admin/chapters/` (the most complete example in the repo) — list + inline create/edit forms + delete/archive, using the same `"use server"` action file pattern.
- **Course status:** add a `status` column (`draft | published | archived`, default `draft`) to `courses` — today every course is implicitly "published" (no gating exists). Public course pages and the dashboard's "available courses" list should filter to `status = 'published'`.
- **Resources:** add a Supabase Storage bucket `course-resources` (private, same per-object RLS idiom as `assignment-submissions`), switch `resources.file_url` usage to Storage object paths + signed URLs generated server-side (mirroring exactly how `app/admin/assignments/[id]/page.tsx` already generates signed download URLs), and build `app/admin/resources/` for upload/attach/detach.
- **Certificates:** a `/certificates/[code]/page.tsx` public verification route (shows student name, course, issue date — nothing else, per the master spec's privacy note) plus a downloadable PDF certificate using `jspdf` (already a dependency — no new package needed) generated from `app/dashboard` when a student clicks "Download Certificate."
- **Enrollment admin:** `app/admin/students/` (roster, search/filter by name/email/course/status) and `app/admin/enrollments/` (manual enroll/un-enroll, wraps the existing `enrollInCourse` action plus a new `removeEnrollment` action) — both reuse the same admin-gate + RLS pattern.
- **Instructor role:** widen `profiles.role` CHECK constraint to `'student' | 'admin' | 'instructor'`; add `course_instructors (course_id, instructor_id)` join table; instructor-facing pages reuse the admin pages but scope every query to `course_id in (select course_id from course_instructors where instructor_id = auth.uid())` — additive, does not touch existing admin behavior.
- **Notifications/announcements:** `announcements (id, title, body, audience_type ['all'|'course'|'student'], course_id, student_id, created_by, created_at)`, admin create UI, and a dashboard "unread" indicator backed by a lightweight `announcement_reads (student_id, announcement_id)` table.
- **Audit log:** `audit_log (id, actor_id, action, entity_type, entity_id, metadata jsonb, ip, created_at)` plus a small `logAudit()` helper called from the sensitive admin actions (course create/delete, enrollment change, certificate-adjacent actions) — additive, no schema risk to existing tables.
- **Search/filters:** client-side filtering is sufficient at current data volume (one course, low enrollment count); revisit server-side filtering only if the roster grows large enough to matter.

## 5. Database changes required

All as new migrations under `supabase/migrations/`, continuing the existing numbering from `008`:

- `009_course_authoring.sql` — `courses.status` (enum/check, default `draft`), `courses.short_description`, `courses.category`, `courses.level`, `courses.language` (fields the master spec asks for that don't exist yet); admin `all` RLS policy on `courses` (currently public-read-only, no admin write policy exists because courses were never meant to be edited via the app).
- `010_course_resources_storage.sql` — `course-resources` Storage bucket + RLS policies (mirror `assignment-submissions` bucket pattern exactly); no `resources` table shape change needed, just how `file_url` gets populated (Storage path instead of arbitrary text).
- `011_instructor_role.sql` — widen `profiles.role` CHECK; new `course_instructors` table + RLS.
- `012_announcements.sql` — `announcements` + `announcement_reads` tables + RLS.
- `013_audit_log.sql` — `audit_log` table (admin/service-role write, admin read only).

**Constraint carried over from this session's established working pattern:** these migrations must be run by the Founder in the Supabase SQL editor — this session cannot execute DDL writes there. Each migration gets queued in `FOUNDER-ACTION-ITEMS.md` (in the separate `VMI-OS` repo) as it's ready, with clear instructions, and implementation of the *application code* that depends on it proceeds in parallel where possible (e.g., the admin UI can be built and reviewed before the migration is actually run, then wired live once it is).

## 6. Required new pages

`app/admin/courses/` (list, create, edit), `app/admin/resources/` (upload/attach), `app/admin/students/` (roster + search), `app/admin/enrollments/` (manage), `app/admin/announcements/` (create/manage), `app/certificates/[code]/page.tsx` (public verification), `app/dashboard/profile/page.tsx` (currently missing entirely — students have no self-service profile/password page), `app/dashboard/certificates/page.tsx` (dedicated certificates list with download, replacing the current inline dashboard cards).

## 7. Required new APIs / server actions

Following the existing `"use server"` action-file convention (not a separate REST API layer — this repo doesn't have one, and introducing one would be an unnecessary architecture change):

- `app/admin/courses/actions.ts`: `createCourse`, `updateCourse`, `archiveCourse`, `createModule`, `deleteModule`.
- `app/admin/resources/actions.ts`: `uploadResource`, `deleteResource`.
- `app/admin/students/actions.ts`: `updateEnrollment`, `removeEnrollment`.
- `app/admin/announcements/actions.ts`: `createAnnouncement`, `deleteAnnouncement`.
- `app/dashboard/certificates/actions.ts`: `generateCertificatePdf` (or client-side `jspdf` call, no server action needed if generation stays client-side from already-fetched data).
- `app/dashboard/profile/actions.ts`: `updateProfile`, `changePassword`.

## 8. Security considerations

- Every new admin action must re-use the exact `auth.getUser()` → `profiles.role === 'admin'` check already standard in this repo, never trust the client.
- Every new Storage bucket must ship with per-object RLS from day one (mirror `assignment-submissions`), never a public bucket for anything gated behind enrollment.
- Certificate verification page must show only the minimum fields specified in the master prompt (name, course, date, code) — no email, no internal IDs.
- Instructor scoping must be enforced at the RLS layer (via `course_instructors`), not just hidden in the UI — same standard already applied to student/admin separation.
- Audit log writes should never block the primary action if logging fails (wrap in try/catch, log-and-continue) — availability of the primary feature matters more than the log entry.

## 9. Video storage/streaming approach

**Recommendation: keep YouTube (Unlisted) — do not introduce S3/CloudFront/Mux/Bunny/Cloudflare Stream.** This was already decided earlier this session on cost/complexity grounds (Supabase Storage bandwidth is far too limited and expensive for video at any real scale; YouTube Unlisted is free, handles transcoding/adaptive bitrate/CDN delivery automatically, and `getEmbedUrl()` already supports it). Introducing a dedicated video pipeline would be a large, costly change for a course catalogue that currently has one course — revisit only if/when VMI needs true DRM-grade protection or has enough paid-video volume that YouTube's terms become a concern.

## 10. Deployment considerations

No deployment target change. New Storage buckets and RLS policies must be created via the same Supabase SQL editor path the Founder already uses for every other migration in this repo. No new environment variables are anticipated for the phases below (no new third-party service is being introduced).

## 11. Risks and compatibility issues

- **`courses.status` defaulting to `draft`:** once added, the existing single course must be explicitly set to `published` in the same migration, or the live course disappears from the public site the moment the migration runs. This will be called out explicitly in the migration file and in the Founder action item.
- **Widening `profiles.role`:** additive (CHECK constraint gets a new allowed value) — zero risk to existing rows.
- **`course_modules.video_url` legacy field:** recommend removing the input from `app/admin/modules/page.tsx`'s edit form (not the column — leave the column alone) once course authoring ships, to stop admins from editing a field the student page never reads. Flag, don't silently change, until confirmed.
- **No test suite exists in this repo today** (confirmed in inspection — no test framework in `package.json`). Per the master prompt's request for tests on critical paths (auth, authorization, enrollment gating), introducing a test framework is itself a small architecture decision — flagged for a explicit go-ahead rather than silently adding a new dependency, per this repo's "do not introduce unnecessary dependencies without reason" convention. Manual verification via the Vercel preview build + live click-through remains the fallback given no local Node runtime is available in this environment either way.

## 12a. Progress log

- **Phase 1 — Course authoring: shipped**, `feature/course-authoring` branch, migration `009_course_authoring.sql` + `/admin/courses` (create/edit/publish/archive) + module create/delete/reorder. Awaiting Founder to run the migration and merge (queued in `FOUNDER-ACTION-ITEMS.md`).
- **Phase 2 — Resource uploads: shipped**, `feature/course-resources` branch, migration `010_course_resources_storage.sql` + `/admin/resources` + Storage-backed, enrollment-gated downloads via signed URLs. Awaiting Founder to run the migration and merge. Flagged one coordination item: the still-unmerged chapters PR (#16) has its own older resource-rendering code that will need a small follow-up patch once merge order is known.
- **Phase 3 — Certificates: shipped**, `feature/certificates` branch, migration `011_certificate_verification.sql` (a `security definer` RPC, `verify_certificate`, that returns only the minimal public fields — no new table, no broadened RLS) + `/certificates/[code]` public verification page + a branded PDF download (client-side `jspdf`, matching the dynamic-import pattern already used by `lib/toolkit/conductor-export.ts`) wired into both the dashboard home and the course detail page's existing certificate cards. Awaiting Founder to run the migration and merge.
- **Phase 4 — Student/enrollment admin: shipped**, `feature/student-admin` branch, migration `012_student_enrollment_admin.sql` (adds admin read policy on `profiles`, admin manage policy on `enrollments` — both previously had zero admin access) + `/admin/students` (roster with name/email search, via the service-role client since `profiles` has no email column) + `/admin/enrollments` (manual enroll/un-enroll). Awaiting Founder to run the migration and merge.
- **Phase 5 — Student profile page: shipped and merged** (`feature/student-profile`, PR #19), no migration needed (the `profiles` "editable by owner" policy already covered this). `/dashboard/profile` — edit name/phone, change password.
- **Phase 6 — Announcements: shipped**, `feature/announcements` branch, migration `013_announcements.sql` (new `announcements` + `announcement_reads` tables, confirmed fully absent before this) + `/admin/announcements` (post to all/one course/one student) + unread announcements surfaced at the top of the student dashboard with a dismiss action. Awaiting Founder to run the migration and merge.
- **Re-prioritizing what's left:** instructor role (original phase 7) stays low-priority — there's still only one course/one course-owner, so there's no real user of a second role yet. Audit log (phase 8) is more useful bundled into new admin actions going forward than retrofitted across 6 already-shipped, unmerged branches right now — doing that retrofit once they've merged is a cleaner fast-follow than rebasing 6 branches today. So: **Phase 7 is now the quiz/assignment edit-delete gap** (both are create-only today) — closing that out, with the new `audit_log` table + a logging helper wired into these new actions as the foundation the retrofit will build on later.

## 12. Phased roadmap

Ordered by dependency and business value, not by the master prompt's original numbering (much of which is already done):

1. **Course authoring** (`app/admin/courses/`, `courses.status` + fields) — unblocks everything else; VMI can add courses without an engineer.
2. **Resources upload UI + Storage bucket** — most-requested missing admin capability, low risk (mirrors an existing proven pattern).
3. **Certificate rendering + public verification page** — high visible value, no schema risk (table already exists).
4. **Student/enrollment admin (roster + manual enroll/un-enroll)** — operational necessity as enrollment grows.
5. **Student self-service profile page** — currently fully missing, low complexity.
6. **Announcements** — new table, moderate complexity, clear value.
7. **Instructor role** — only worth doing once VMI actually has a second course-owner; low urgency with one course today.
8. **Audit log** — do alongside whichever admin feature is being built next, incrementally, rather than as a standalone phase.
9. **Search/filters, quiz/assignment edit-delete UI, module create/delete UI** — polish passes on existing CRUD surfaces, lowest urgency.

---

*Next: confirm phase priority with the Founder before starting implementation — this plan touches 5+ new migrations and several new admin surfaces, and the order above is a recommendation, not a decision only I should make.*

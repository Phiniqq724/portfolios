# TODO List: Custom Error Pages (404 & 500)

This checklist maps out the exact steps required to implement custom error pages that match your site's design language. **Do not execute any implementation steps until this plan is approved.**

---

## Phase 1: Cleanup (Why `404.tsx` didn't work)
- [ ] **Step 1.1**: Delete `src/app/404.tsx`.
  - **Root cause**: `404.tsx` is a **Pages Router** convention. This project uses the **App Router**, which uses `not-found.tsx` instead. Having the wrong file does nothing.

---

## Phase 2: Custom Not-Found Page (404)
- [ ] **Step 2.1**: Create `src/app/not-found.tsx`.
  - This file is automatically used by Next.js App Router for:
    - Any URL that doesn't match a route (e.g. user types `/asdfgh`)
    - Any page that calls `notFound()` (e.g. `src/app/projects/[id]/page.tsx` already does this)
  - Design to match your site: full-screen, monospace font, large error code, short message, and a back-to-home button styled like your existing `border border-primary/20` buttons.
  - No `"use client"` needed — this is a Server Component.

---

## Phase 3: Custom Runtime Error Page (500)
- [ ] **Step 3.1**: Create `src/app/error.tsx`.
  - This catches unexpected runtime errors inside any route (data fetching failures, component crashes, etc.)
  - **Must** be a Client Component (`"use client"`) as per Next.js requirements.
  - Props to accept: `error: Error & { digest?: string }` and `unstable_retry: () => void`.
  - Design to match your site: similar layout to the 404 page but with a different message (e.g. "SOMETHING BROKE.") and two action buttons: "TRY AGAIN" (calls `unstable_retry()`) and "GO HOME" (links to `/`).
- [ ] **Step 3.2**: Create `src/app/global-error.tsx`.
  - This catches errors specifically in the **root layout** (`layout.tsx`) itself.
  - **Must** be a Client Component and **must** include its own `<html>` and `<body>` tags (since the root layout is unavailable when this fires).
  - Import `globals.css` and fonts directly inside this file.
  - Same design language but self-contained.

---

## Phase 4: Verification & Manual Testing
- [ ] **Step 4.1**: Test the 404 page by navigating to a random URL (e.g. `http://localhost:3000/thisdoesnotexist`). Verify the custom page renders correctly.
- [ ] **Step 4.2**: Verify the existing `notFound()` call in `src/app/projects/[id]/page.tsx` still works by navigating to a non-existent project ID (e.g. `/projects/fake-id`).
- [ ] **Step 4.3**: Temporarily throw an error in a page component to verify `error.tsx` catches it and renders the custom error UI correctly.

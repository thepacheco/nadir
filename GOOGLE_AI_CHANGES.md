# Google AI Changes

This document outlines all of the modifications, architectural additions, and UI tweaks implemented by the AI (Google AI / Fable 5) to transition Nadir from a frontend demo to an operational, data-backed enterprise platform, while adhering to the founder's feedback.

---

## 1. Demo Unlocking & UI Polish

**Goal:** Unlock the initial restrictive state of the demo for easier navigation and improve visual feedback (animations, opacities) for error handling.

*   **`components/nadir/AppShell.tsx`**
    *   **Unlocked Navigation:** Removed the `locked` logic (`const locked = false;`) that previously restricted access to tabs before Step 5 of onboarding was completed.
    *   **Badge Animation:** Added a custom CSS animation (`nadirBadgePop`) to notification badges so they perform a subtle "pop" transition when errors/counts update.
    *   **Route Splitting:** Updated the sidebar logic to handle the newly separated `inbox` and `tickets` routes instead of the merged `team` route.
*   **`components/nadir/Workspace.tsx`**
    *   **Error Rendering:** Updated the `toastView` logic to ensure errors/alerts only pop up if the operational graph is live (`obStep === 5`).
    *   **Notification Belt:** Modified the `dismissToast` action. Clicking the "X" on a popup now actively pushes the dismissed alert into the Notification Bell as a warning, maintaining the audit trail.
*   **`components/nadir/Toast.tsx`**
    *   **Visual Subtlety:** Lowered the outer container's opacity to `0.9` to make the error codes popping up on the left side feel less intrusive.
*   **`app/globals.css`**
    *   **Keyframes:** Added the `@keyframes nadirBadgePop` rule to power the new notification animations.

---

## 2. Navigational Split: Inbox vs. Ticketing

**Goal:** Address the request that the Team Inbox and the Ticketing System should be two distinct areas rather than merged into one screen.

*   **`lib/constants.ts`**
    *   Removed the unified `Team & inbox` screen.
    *   Added two distinct entities to the `SCREENS` array: `{ id: "inbox", label: "Team inbox" }` and `{ id: "tickets", label: "Ticketing system" }`.
*   **`components/nadir/TeamScreen.tsx`**
    *   Parameterised the component to accept a `mode` prop (`"inbox" | "tickets"`).
    *   The component now acts as a dual-purpose layout. When in `inbox` mode, it shows the team communication flow. When in `tickets` mode, it strictly displays the Kanban ticket board and department tree.

---

## 3. Phase 2: Predictive Operations & Bidding Engine (Live Production Code)

**Goal:** Move away from mocked frontend data and establish a real backend processing pipeline, database, and deterministic micro-costing engine.

*   **Database Setup (`prisma/schema.prisma` & `lib/prisma.ts`)**
    *   Installed and initialized **Prisma ORM** mapped to a local SQLite database (for rapid iteration, ready for PostgreSQL).
    *   Designed a schema featuring `Company`, `Item`, `BOM` (recursive Bill of Materials), and `Bid` models. This allows items to be broken down recursively into labor, raw materials, and packaging.
*   **Micro-Costing Engine (`lib/engine/micro-costing.ts`)**
    *   Built the deterministic arithmetic engine. It recursively traverses the database BOMs to calculate the true floor cost of a complex product (e.g., breaking down a "Breakfast Meal" into apple slices, labor time, and packaging).
*   **Data Ingestion Service (`lib/engine/ingestion.ts`)**
    *   Built a backend service capable of parsing structured historical cycle counts and menus, mapping them instantly into the relational database to build the "Operational Graph."
*   **Automated Bidding UI & API**
    *   **`app/api/bids/generate/route.ts`:** Created a POST endpoint that takes a contract request, runs it through the micro-costing engine, applies the user-defined margin, and saves the final Bid.
    *   **`app/(site)/platform/bidding/page.tsx` & `BiddingInterface.tsx`:** Built a premium, data-dense interface allowing the C-Suite to quickly roll up micro-costs, apply target margins, and spit out accurate bids that are saved to a historical ledger.
*   **Validation Harness (`scripts/test-engine.ts`)**
    *   Created a backend script to test the NuRest Airline Use Case. It programmatically cleans the DB, ingests dummy BOM data, and verifies the micro-costing engine calculates costs perfectly (e.g., 80,000 meals = $31,999.68).

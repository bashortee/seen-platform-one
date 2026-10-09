# SEEN product roadmap

SEEN is being built in small, self-contained milestones. The product surface comes first so the experience can be reviewed and refined before data and integrations are wired in.

## Milestone 1 — Product surface (done)

- Landing page, sign-up, sign-in and role onboarding (Artist / Manager / Label).
- App shell with working sidebar, mobile navigation and a global "Demo data" switch.
- Dashboard, Catalogue, Performance, Audience & geography, Social presence, Opportunities & gaps, Action planner, Ask SEEN and Settings screens.
- Reusable cards, tables, charts (with table views), tabs, form fields and loading / empty / error states.
- All figures come from `src/data/demo.ts` and are labelled "Demo data". No fake backend.

## Milestone 2 — Accounts and authentication

- Real sign-up, sign-in, password reset and sign-out (Netlify Identity).
- Protect `/app/*` routes; replace the "Accounts aren't live yet" notices.
- Store role and display name on the user profile instead of localStorage.

## Milestone 3 — Data model and persistence

- Netlify Database (Postgres + Drizzle) schema: workspaces, members and roles, artists, releases, tracks, tasks, opportunities.
- Server routes for catalogue CRUD and the action planner; move planner tasks out of localStorage.
- Manager and label workspaces with multiple artists (roster switcher becomes real).

## Milestone 4 — Catalogue import

- Manual release / track entry and CSV import from distributors.
- Metadata health scoring computed from stored fields (ISRC, UPC, credits, tags).

## Milestone 5 — Platform connections

- OAuth connections to streaming and social platforms, handled entirely server-side with credentials in environment variables.
- Scheduled background sync jobs; every figure shows its source and last-updated time.
- Replace `useDemoData` and the demo fixtures with real queries, keeping demo mode for new users.

## Milestone 6 — Insights engine

- Compute performance trends, breakout cities, social gaps and career gaps from real data.
- Generate ranked opportunities with evidence links; one-click "Add to planner".

## Milestone 7 — Ask SEEN AI assistant

- Server-side AI via Netlify AI Gateway, grounded in the user's own workspace data.
- Cite the figures used in each answer; never answer with invented numbers.

## Milestone 8 — Notifications and collaboration

- Weekly summary emails, breakout alerts and task reminders (Settings → Notifications).
- Shared tasks, assignees and comments for managers and labels.

## Later

- Billing and plans (deliberately out of scope until the core product is proven).

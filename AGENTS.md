# AGENTS.md

Guidance for AI agents and developers working on **SEEN — Smart Entertainment Evolution Engine**, a music intelligence platform for independent artists, managers and labels.

**Start here:** read [PLAN.md](./PLAN.md). Milestone 1 (the full front-end surface) is complete; continue from the next milestone in the roadmap.

## Tech stack

| Layer | Technology |
| --- | --- |
| Framework | TanStack Start (React 19, TanStack Router v1, file-based routes) |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 with theme tokens in `src/styles.css` |
| Charts | Chart.js 4 via react-chartjs-2 |
| Icons | lucide-react |
| Language | TypeScript (strict) |
| Hosting | Netlify (`@netlify/vite-plugin-tanstack-start`) |

## Directory structure

```
src/
├── routes/                 File-based routes (routeTree.gen.ts is generated — don't edit)
│   ├── __root.tsx          HTML shell, fonts, meta, 404 page
│   ├── index.tsx           Landing page
│   ├── sign-in.tsx / sign-up.tsx / onboarding.tsx
│   ├── app.tsx             /app layout: AppShell (sidebar + top bar) + error boundary
│   └── app.*.tsx           Dashboard (app.index), catalogue, performance, audience,
│                           social, opportunities, actions, assistant, settings
├── components/
│   ├── ui/                 Reusable primitives: Button, Card, Badge/DemoBadge, Tabs,
│   │                       DataTable, Field (TextField/SelectField/Switch), States
│   │                       (Skeleton/EmptyState/NotConnectedState/ErrorState), Misc
│   │                       (PageHeader, StatTile, Delta, ProgressBar, Logo)
│   ├── charts/             theme.ts (Chart.js registration + palette), LineChart,
│   │                       BarChart, ChartCard (frame with demo label, chart/table toggle,
│   │                       loading and not-connected states)
│   ├── layout/             AppShell, nav config, PublicHeader, AuthLayout
│   └── OpportunityCard.tsx
├── data/demo.ts            ALL sample data lives here — the single seam to replace later
└── lib/
    ├── preferences.ts      localStorage-backed store (role, display name, demo toggle, tasks)
    ├── tasks.ts            Planner task helpers
    ├── useDemoData.ts      loading → ready lifecycle; returns 'off' when demo data is disabled
    ├── validation.ts       Form validators
    └── cn.ts               className join + number formatting
```

## Data honesty rules (non-negotiable)

- Every chart, figure or table built from sample data must show `<DemoBadge />` (ChartCard does this automatically).
- Never present demo data as real performance, never claim a platform is connected, never invent live API results.
- Ask SEEN only returns pre-written replies for the suggested prompts in `assistantPrompts`, labelled as such; any other question gets an "isn't connected yet" message. Do not add AI calls client-side.
- Auth screens validate input but create no account — they say so explicitly.
- Secrets belong in Netlify environment variables, used only in server code.

## Conventions

- Dark-first design. Use theme tokens (`bg-ink-*`, `text-fg`, `text-fg-2`, `text-fg-3`, `bg-signal`, `border-white/[0.07]`) rather than raw hex.
- Typography: `font-display` (Instrument Serif) for headings and hero numbers, Geist for UI, Geist Mono for eyebrows/codes.
- Chart colours: fixed categorical slots `SERIES` in `charts/theme.ts`. Pass `colorIndex` on line series so colours follow the entity when filters remove series. One y-axis per chart. Brand `signal` lime is for UI accents, not data series.
- Each page: `PageHeader` → content in `Card`/`ChartCard`; handle `status` from `useDemoData()` (`loading` → Skeleton, `off` → NotConnectedState).
- Interactive elements must be keyboard accessible (Tabs support arrow keys; toggles use `aria-pressed`/`role="switch"`).
- Make the smallest edit that does the job; match surrounding style (2-space indent, no semicolons, single quotes).

## Non-obvious decisions

- The template's TanStack Start setup was kept (it is React + TypeScript + Vite) for file-based routing and Netlify SSR support.
- `usePreferences` uses `useSyncExternalStore` with a server snapshot so SSR and hydration agree; client values apply after hydration.
- Settings tabs are driven by the `?tab=` search param so "Open data settings" links from empty states land on the right tab.

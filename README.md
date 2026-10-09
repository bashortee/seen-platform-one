# SEEN — Smart Entertainment Evolution Engine

SEEN is a music intelligence platform for independent artists, artist managers and record labels. It turns music industry data — catalogue, streaming, audience, geography and social signals — into clear insights and a short list of actions worth taking next.

This is the **first version of the front end**. Every screen is built and clickable, and it runs entirely on **clearly labelled demo data** for a fictional artist (Halcyon Reed). No streaming service, social network or AI model is connected yet, and no figure in the app describes a real artist.

## What's included

| Screen | URL |
| --- | --- |
| Landing page | `/` |
| Sign up / Sign in | `/sign-up`, `/sign-in` |
| Onboarding (Artist, Manager or Label) | `/onboarding` |
| Dashboard | `/app` |
| Music catalogue | `/app/catalogue` |
| Performance analytics | `/app/performance` |
| Audience & geographic insights | `/app/audience` |
| Social presence | `/app/social` |
| Opportunities & career gaps | `/app/opportunities` |
| Action planner | `/app/actions` |
| Ask SEEN assistant | `/app/assistant` |
| Settings | `/app/settings` |

Things to try: switch the **Demo data** toggle in the top bar off to see the empty "not connected" states; change time ranges and filters; sort tables; open a release in the catalogue; add opportunities to the action planner and tick them off; ask one of the suggested questions in Ask SEEN.

> **About sign-in:** accounts are not live yet. The sign-up and sign-in forms validate your input and then explain that nothing was created or sent. Your role, display name and planner tasks are remembered **in your browser only** (localStorage).

## Technology

- **React 19 + TypeScript**
- **Vite 7** build tool, with **TanStack Start / TanStack Router** for file-based routing
- **Tailwind CSS 4** for styling (dark theme tokens live in `src/styles.css`)
- **Chart.js** (via `react-chartjs-2`) for charts
- **lucide-react** icons
- Deployed on **Netlify**

## Run it on your computer (beginner guide)

1. **Install Node.js** (version 20 or newer) from <https://nodejs.org>. Choose the "LTS" download.
2. **Install pnpm** (the package manager this project uses). Open a terminal and run:
   ```bash
   npm install -g pnpm
   ```
3. **Get the code** and open the project folder in your terminal:
   ```bash
   git clone <your-repository-url> seen
   cd seen
   ```
4. **Install the dependencies:**
   ```bash
   pnpm install
   ```
5. **Start the development server:**
   ```bash
   pnpm dev
   ```
6. Open <http://localhost:3000> in your browser. Changes you make to the code reload automatically.

### Checks

```bash
pnpm typecheck   # TypeScript type check
pnpm build       # Production build (outputs to dist/)
```

### Preview with Netlify features locally (optional)

If you have the Netlify CLI (`npm install -g netlify-cli`), run `netlify dev` instead of `pnpm dev`. It serves the app on <http://localhost:8888> with Netlify's local emulation.

## Deploy to Netlify

The project already contains a `netlify.toml`, so Netlify knows how to build it.

1. Push the code to a Git repository (GitHub, GitLab or Bitbucket).
2. In the Netlify dashboard choose **Add new project → Import an existing project** and pick the repository.
3. Netlify reads the settings from `netlify.toml` (build command `vite build`). Click **Deploy**.
4. Every push to the main branch redeploys the site; pull requests get their own preview URL.

## Secrets and API keys

There are no API keys in this project and none are needed yet. When real integrations are added, keys must be stored as **Netlify environment variables** and only used inside server-side code (Netlify Functions or server routes) — never in files under `src/` that ship to the browser. `.env` files are already ignored by Git.

## Roadmap

The full product roadmap — accounts, a real database, platform connections, the AI assistant and more — is in [PLAN.md](./PLAN.md).

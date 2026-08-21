# SMU CP Info Site

The source for [info.smujudge.com](https://info.smujudge.com) — the public information site for SMU's competitive programming club. Built with Vite + TypeScript, deployed as a Cloudflare Worker.

## Important: `main` is live

The `main` branch is continuously deployed to production at **info.smujudge.com**. Do not push directly to `main`. Open a pull request and let CI pass before merging.

## Getting started

Use the provided Dev Container — it sets up the correct Node.js version and installs dependencies automatically.

**Requirements:** Docker and the VS Code Dev Containers extension (or any editor with Dev Container support).

1. Open the repository in VS Code
2. When prompted, click **Reopen in Container** (or run `Dev Containers: Reopen in Container` from the command palette)
3. The container runs `npm ci` on creation, so dependencies are ready immediately
4. Start the dev server:
   ```
   npm run dev
   ```
   The site is available at `localhost:5173`.

## Project structure

```
src/
  members.ts          # Members page logic
  members/
    logic.ts          # Member filtering/sorting
    types.ts          # Member type definitions
  trainings/
    data.ts           # Training section content
    types.ts
  api/
    codeforces.ts     # Codeforces API client
  constants.ts        # Rating band thresholds and external URLs
  shared.ts
public/
  data/
    members.csv       # Member roster (name, Codeforces handle, AtCoder handle)
    atcoder-ratings.json  # Cached AtCoder ratings (see below)
scripts/
  update-atcoder-ratings.ts  # Fetches and caches AtCoder ratings
members/index.html    # Members page entry point
trainings/index.html  # Trainings page entry point
```

## Updating member data

### Adding or editing members

Edit `public/data/members.csv`. The columns are `name`, `codeforces_handle`, `atcoder_handle` (AtCoder handle is optional).

### Updating AtCoder ratings

AtCoder does not have a public API, so ratings are pre-fetched and cached in `public/data/atcoder-ratings.json`. This file is refreshed automatically by a cron job every Monday at 8:00 AM SGT — you do not need to update it manually.

If you have a branch open over a Monday, pull the updated cache and rebase your changes on top of it before merging:

```
git fetch origin
git rebase origin/main
```

## Common commands

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server at `localhost:5173` |
| `npm run build` | Type-check and build for production |
| `npm run typecheck` | Run TypeScript type checks only |
| `npm run lint` | Run ESLint |
| `npm test` | Run unit tests (Vitest) |
| `npm run update:atcoder` | Refresh cached AtCoder ratings |

## CI

Every pull request runs the full CI pipeline: type checking, lint, unit tests, and a production build. All checks must pass before merging.

# SMU CP Info Site

Source for [info.smujudge.com](https://info.smujudge.com). Implemented in React, TypeScript, Tailwind CSS and TanStack Router, built with Vite and deployed on Cloudflare.

## Notes
1. `main` is continuously deployed to production
2. `main` is NOT protected, but guards against force pushes and deletions.
   - Why: I did want to make a PR only thing and protect main, but then i think my cron job can't commit directly to `main` (see point 9)
3. `main` requires linear history. For feature changes, can rebase on `main` if possible.
4. There is a Development Container that I use in  `.devcontainer/`. 
5. Use Pull Requests where possible! When merging onto `main`, I configured preview urls (see [this closed PR](https://github.com/JET2001/smu-cp-info-site/pull/3#issuecomment-5655495756)) via github actions to let us see whether the changes are reflected there before deployment. This will only be created **as a PR comment** when the build on the incoming branch passes. This is implemented in `./scripts/comment-preview.sh`.
   - **Potential Improvement:** My preview urls are actually public XD, means anyone can see them. I should delete them on once I closed the PR, but have yet to find some time to do that.
   - In the preview URL, remember to check that the screen resizes properly! I have 2 views: one at a standard laptop screen, and then a "mobile view" when the screen size is less than `760px`. Currently I just check this by resizing my google chrome browser. If you have other ways, do let me know!

### Notes on web pages and state of development
6. The first two pages of the site is a static frontend, the images on `Trainings` are found in `src/assets/`
7. Members page: Member data is found in a csv `public/data/members.csv`.
8. Members page: On page load, we make a REST API call to the codeforces API to get CF ratings (see `src/api/codeforces.ts`).We are able to query multiple handles at once, but if there exists an invalid handle, the whole API call gets a `404` verdict, the error message will contain the first failing handle. The current method is this:

       A. Query all users if possible. If all handles are valid, then we return immediately. 
       B. In the event of an error, we remove the failing handle, and make the same API call.
       C. Skip over the failing handle, and mark this as the new start of the dataset. 
       D. Repeat step A if we have not processed the full dataset. 
      
   There are some unit tests to test this functionality in `tests/api/codeforces.test.ts`.

9. Atcoder ratings are read from `public/data/atcoder-ratings.json`. It is triggered by a github actions cron job at `.github/workflows/update_atcoder.yaml` **which runs weekly on Monday 8 am - 12 pm SGT** ([see its commit](https://github.com/JET2001/smu-cp-info-site/commit/a8729479fe50f2077e107560b4156643eccb49c7)). 
   - Reasons: 
      - There is no official API for Atcoder, and I am actually using the API by a member of the community (`@qatadaazzeh/atcoder-api`), which does this by downloading the page via `curl` and extracting the rating. 
      - As such, it is _very slow_, and if I do this while page loads it will take about 30 seconds. 
      - Atcoder Contests are generally held on weekends, so my data will most likely contain the updated rating by Monday noon.

10. The site is a single-page app with one entry point (`index.html`). Routing is handled client-side by TanStack Router (`src/router.tsx`), with routes for `/`, `/trainings/` and `/members/`. Cloudflare serves `index.html` for unknown paths (`not_found_handling: single-page-application` in `wrangler.jsonc`), so deep links work.

11. Styles are written with Tailwind CSS utilities inline on components. Shared design tokens (colors, fonts, custom breakpoints) and the `page-container` utility live in `src/globals.css`.

#### Project structure

```
src/
  main.tsx            # App entry point
  router.tsx          # TanStack Router route tree
  globals.css         # Tailwind import, design tokens, page-container utility
  constants.ts        # Rating band thresholds and external URLs
  components/         # Header, footer and page heading
  routes/             # Home, Trainings and Members pages
  api/
    codeforces.ts     # Codeforces API client (unit tested)
  members/            # logic for members page and types
    logic.ts          # dynamically loading the table and colors (this file is unit tested)
  trainings/          # data and types for trainings page
    ...
public/
  data/
    members.csv       # Member roster (name, Codeforces handle, AtCoder handle)
    atcoder-ratings.json  # Cached AtCoder ratings (see below)
scripts/
  update-atcoder-ratings.ts  # Fetches and caches AtCoder ratings
index.html            # Single HTML entry point
```
## Commands

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server at `localhost:5173` |
| `npm run build` | Type-check and build for production |
| `npm run typecheck` | Run TypeScript type checks only |
| `npm run lint` | Run ESLint |
| `npm test` | Run unit tests (Vitest) |
| `npm run update:atcoder` | Refresh cached AtCoder ratings |
# Teamly landing page

Marketing site for **Teamly**, the futsal club management platform. Static, bilingual (English and Portuguese), light and dark.

## Stack

Next.js 15 (App Router, static export), TypeScript (`strict`), React 19. Plain CSS on semantic tokens (`src/app/globals.css`), no UI framework. Geist via `next/font`.

## Run

```bash
npm install
cp .env.example .env.local   # then fill in the two values below
npm run dev                  # http://localhost:3000
npm run typecheck
npm run lint
npm run build                # static site in out/
```

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_APP_URL` | Public URL of the Teamly app. Every "Go to the app" link points here. Defaults to `http://localhost:3000` in development. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Address that receives "Request access" emails (the form opens the visitor's email app). |

Both are **required for production builds**; the build fails with a clear message if one is missing.

## Structure

```
src/app/(site)/[locale]/   the page, one static route per language (/en, /pt)
src/app/(redirect)/        "/" sends visitors to /en or /pt from their browser language
src/components/            sections; client components only where state is needed
src/dictionaries/          en.ts and pt.ts, typed against each other (a missing key fails the type-check)
src/lib/                   i18n helpers, env config, screenshot paths
public/brand/              logo lockups built from the official Teamly logo files
public/screens/            app screenshots, one light and one dark per page
```

## Screenshots

`public/screens/<name>-light.webp` and `<name>-dark.webp` (1600 px wide, 16:10) are captures of the real app running with fictional demo data. The page shows the one matching the visitor's theme. Names used: `home`, `calendar`, `squad`, `trainings`, `board`, `stats`, `scouting` (see `src/lib/screens.ts`). To refresh them, recapture at 1440×900 and export at 1600 px wide with the same names. Use fictional data only.

## Theme

Light by default, dark from the system setting, and a toggle in the top bar that is remembered in `localStorage`. All colours come from tokens in `globals.css`; the brand blues are sampled from the logo.

## Deploy

`npm run build` writes a fully static site to `out/`. Serve it from any static host with `/` and `/en/`, `/pt/` as folders (`trailingSlash` is on).

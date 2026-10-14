# NYS Creative Academy

Website for NYS Creative Academy, built with [Next.js](https://nextjs.org) (App Router) and TypeScript.

## Running locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck
```

## Structure

- `app/` — routes (`/`, `/about`, `/academies`, `/apply`, `/support`), the root layout and the global stylesheets (`styles.css`, `site.css`).
- `components/` — shared UI: header with mobile menu, footer, buttons, application form, Hugeicons `Icon`.
- `content/` — all site copy and images.
  - `types.ts` defines the content model.
  - `data.ts` holds the current local content.
  - `index.ts` exposes async getters (`getHomePage()`, `getAcademies()`, …) that pages call.

## Connecting a CMS

Pages only read content through `content/index.ts`. To move to a CMS, model its documents on `content/types.ts`, then replace each getter in `content/index.ts` with a fetch from the CMS. No page or component changes are needed. Headings use `{ lead, emphasis }`, where `\n` in `lead` is a line break and `emphasis` is the italic accent ending.

## Notes

- Icons come from the free Hugeicons Stroke Rounded webfont (loaded from their CDN in `app/layout.tsx`).
- The application form has no backend in Phase 1; submitting only shows a confirmation.

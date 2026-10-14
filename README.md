# NYS Creative Academy

Website and admin dashboard for NYS Creative Academy, built with [Next.js](https://nextjs.org) (App Router) and TypeScript. Hosted on Vercel, with data in Neon Postgres.

## Running locally

```bash
npm install
cp .env.example .env.local   # then set ADMIN_SETUP_TOKEN (see below)
npm run dev                  # http://localhost:3000, admin at /admin
npm run build                # production build
npm run typecheck
```

Without `DATABASE_URL`, the app uses an embedded Postgres (PGlite) stored in `.data/`. It needs no installation and applies migrations by itself. Delete `.data/` to start over. To work against Neon instead, put a Neon connection string in `DATABASE_URL`. Use a separate Neon branch for development, not production.

## Structure

- `app/(site)/` holds the public pages (`/`, `/about`, `/academies`, `/apply`, `/support`), their layout and the site stylesheets (`styles.css`, `site.css`).
- `app/admin/` holds the admin area. It has its own root layout and `admin.css`:
  - `login/` and `setup/` handle sign-in and first-run setup.
  - `(panel)/` contains everything behind sign-in: overview, applications (list, detail, CSV export), subscribers (list, CSV export) and admins.
- `components/` holds the shared site UI. `components/admin/` holds the admin UI pieces.
- `content/` holds all site copy and images:
  - `types.ts` is the content model.
  - `data.ts` is the current content.
  - `index.ts` provides the async getters that pages call.
- `lib/db/` holds the database schema (Drizzle) and the connection: Neon when `DATABASE_URL` is set, otherwise PGlite.
- `lib/auth/` covers admin auth:
  - password hashing (scrypt)
  - database-backed sessions, where the cookie holds a random token and only its hash is stored
  - `requireAdmin()`, which every admin page, action and export calls
- `lib/leads/actions.ts` is where the apply and newsletter forms save submissions. A hidden spam-trap field quietly drops bot submissions.
- `lib/admin/` holds the admin server actions and queries.
- `proxy.ts` sends visitors without a session cookie from `/admin/*` to the login page.
- `drizzle/` holds the SQL migrations generated from `lib/db/schema.ts`.

## Deploying to Vercel with Neon

1. Create a Neon project, and copy its connection string from Neon → Connect.
2. In Vercel → Project → Settings → Environment Variables, add:
   - `DATABASE_URL`: the Neon connection string.
   - `ADMIN_SETUP_TOKEN`: a long random value, for example from `openssl rand -base64 32`.

   Vercel's Neon integration can add `DATABASE_URL` for you.
3. Create the tables by running `npm run db:migrate` with `DATABASE_URL` pointing at the Neon database (for example in `.env.local`).
4. Deploy, open `/admin`, and you'll be sent to `/admin/setup`. Enter the setup token and create the first admin.
5. Signed in, go to **Admins** to add the second admin. The setup page stops working once any admin exists.

## Changing the database

Edit `lib/db/schema.ts`, then run `npm run db:generate` to write a new migration in `drizzle/`. Then run `npm run db:migrate` against Neon before deploying the code that relies on it. Locally, PGlite applies new migrations on the next start.

## Content

Pages read content only through `content/index.ts`. For the CMS, those getters will read from the database instead of `data.ts`, and no page or component changes. Headings use `{ lead, emphasis }`, where `\n` in `lead` is a line break and `emphasis` is the italic accent ending.

Icons come from the free Hugeicons Stroke Rounded webfont, loaded from their CDN in the layouts.

import { defineConfig } from 'drizzle-kit';

// `npm run db:generate` writes SQL migrations to drizzle/ from lib/db/schema.ts;
// `npm run db:migrate` applies them to the Neon database in DATABASE_URL.
export default defineConfig({
  dialect: 'postgresql',
  schema: './lib/db/schema.ts',
  out: './drizzle',
  dbCredentials: { url: process.env.DATABASE_URL ?? '' },
});

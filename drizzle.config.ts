import { defineConfig } from 'drizzle-kit';

// `npm run db:generate` writes SQL migrations to drizzle/ from lib/db/schema.ts;
// `npm run db:migrate` applies them to Neon over the direct connection (DATABASE_URL_UNPOOLED).
export default defineConfig({
  dialect: 'postgresql',
  schema: './lib/db/schema.ts',
  out: './drizzle',
  dbCredentials: { url: process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL ?? '' },
});

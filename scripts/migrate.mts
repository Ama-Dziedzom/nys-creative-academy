// Applies the SQL migrations in drizzle/ to the Neon database in DATABASE_URL.
// Run with `npm run db:migrate` after `npm run db:generate`, and before deploying schema changes.
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { migrate } from 'drizzle-orm/neon-http/migrator';

const url = process.env.DATABASE_URL;
if (!url) {
  console.error('DATABASE_URL is not set. Put the Neon connection string in .env.local or the environment.');
  process.exit(1);
}
await migrate(drizzle({ client: neon(url) }), { migrationsFolder: 'drizzle' });
console.log('Migrations applied.');

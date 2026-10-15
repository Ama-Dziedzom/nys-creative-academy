// Applies the SQL migrations in drizzle/ to the Neon database.
// Run with `npm run db:migrate` after `npm run db:generate`, and before deploying schema changes.
// Migrations use the direct connection (DATABASE_URL_UNPOOLED), not the -pooler one the app uses.
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';

const url = process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL;
if (!url) {
  console.error('DATABASE_URL_UNPOOLED is not set. Run `neon env pull` or put the Neon connection strings in .env.local.');
  process.exit(1);
}
const pool = new Pool({ connectionString: url });
await migrate(drizzle({ client: pool }), { migrationsFolder: 'drizzle' });
await pool.end();
console.log('Migrations applied.');

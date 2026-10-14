import 'server-only';
import { mkdirSync } from 'node:fs';
import { neon } from '@neondatabase/serverless';
import { drizzle as drizzleNeon } from 'drizzle-orm/neon-http';
import { connection } from 'next/server';
import * as schema from './schema';

/**
 * The database: Neon when DATABASE_URL is set (production, previews and any
 * developer who points at a Neon branch), otherwise an embedded Postgres
 * (PGlite) stored in .data/ so the site runs locally with no setup.
 */
function connect() {
  if (process.env.DATABASE_URL) return drizzleNeon({ client: neon(process.env.DATABASE_URL), schema });
  if (process.env.VERCEL) throw new Error('DATABASE_URL is not set. Add the Neon connection string in the Vercel project settings.');
  return null;
}

type Database = ReturnType<typeof drizzleNeon<typeof schema>>;

const globalForDb = globalThis as unknown as { db?: Promise<Database> };

async function connectLocal(): Promise<Database> {
  const { PGlite } = await import('@electric-sql/pglite');
  const { drizzle } = await import('drizzle-orm/pglite');
  const { migrate } = await import('drizzle-orm/pglite/migrator');
  mkdirSync('.data', { recursive: true });
  const db = drizzle({ client: new PGlite('.data/pglite'), schema });
  await migrate(db, { migrationsFolder: 'drizzle' });
  // Both drivers share Drizzle's Postgres query builder, so one type serves both.
  return db as unknown as Database;
}

/** Anything that reads the database renders per request, never at build time. */
export async function getDb(): Promise<Database> {
  await connection();
  globalForDb.db ??= (async () => connect() ?? connectLocal())();
  return globalForDb.db;
}

export { schema };

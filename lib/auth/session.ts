import 'server-only';
import { createHash, randomBytes } from 'node:crypto';
import { and, eq, gt, lt } from 'drizzle-orm';
import { cookies } from 'next/headers';
import { getDb, schema } from '@/lib/db';

export const SESSION_COOKIE = 'nys_admin_session';
const SESSION_DAYS = 14;

const hashToken = (token: string) => createHash('sha256').update(token).digest('hex');

export async function createSession(adminId: string) {
  const db = await getDb();
  const token = randomBytes(32).toString('base64url');
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  // Clear out this admin's expired sessions while we're here.
  await db.delete(schema.sessions).where(and(eq(schema.sessions.adminId, adminId), lt(schema.sessions.expiresAt, new Date())));
  await db.insert(schema.sessions).values({ tokenHash: hashToken(token), adminId, expiresAt });
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: expiresAt,
  });
}

/** The signed-in admin for this request, or null. */
export async function readSession() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const db = await getDb();
  const [row] = await db
    .select({ id: schema.admins.id, name: schema.admins.name, email: schema.admins.email })
    .from(schema.sessions)
    .innerJoin(schema.admins, eq(schema.admins.id, schema.sessions.adminId))
    .where(and(eq(schema.sessions.tokenHash, hashToken(token)), gt(schema.sessions.expiresAt, new Date())));
  return row ?? null;
}

export async function deleteSession() {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (token) {
    const db = await getDb();
    await db.delete(schema.sessions).where(eq(schema.sessions.tokenHash, hashToken(token)));
  }
  store.delete(SESSION_COOKIE);
}

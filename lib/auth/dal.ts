import 'server-only';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import { readSession } from './session';

export type SessionAdmin = { id: string; name: string; email: string };

/**
 * Every admin page and admin action calls this before touching data. It reads
 * the session from the database (the proxy only checks the cookie exists).
 */
export const requireAdmin = cache(async (): Promise<SessionAdmin> => {
  const admin = await readSession();
  if (!admin) redirect('/admin/login');
  return admin;
});

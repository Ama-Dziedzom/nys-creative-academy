'use server';

import { and, count, eq, ne } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import * as z from 'zod';
import { requireAdmin } from '@/lib/auth/dal';
import { hashPassword, verifyPassword } from '@/lib/auth/password';
import { createSession, deleteSession } from '@/lib/auth/session';
import { getDb, schema } from '@/lib/db';

export type FormState = { message?: string; ok?: boolean };

const text = (formData: FormData, name: string) => String(formData.get(name) ?? '').trim();
const MAX_FAILURES = 5;
const LOCK_MINUTES = 15;
let dummy: Promise<string> | undefined;
const dummyHash = () => (dummy ??= hashPassword('not-a-real-password'));
const Password = z.string().min(10, 'Use at least 10 characters for the password.').max(200);

export async function login(_state: FormState, formData: FormData): Promise<FormState> {
  const email = text(formData, 'email').toLowerCase();
  const password = String(formData.get('password') ?? '');
  const db = await getDb();

  const [attempts] = await db.select().from(schema.loginAttempts).where(eq(schema.loginAttempts.email, email));
  const lockedUntil = attempts && new Date(attempts.lastFailureAt.getTime() + LOCK_MINUTES * 60_000);
  if (attempts && attempts.failures >= MAX_FAILURES && lockedUntil! > new Date()) {
    return { message: `Too many attempts. Try again in ${LOCK_MINUTES} minutes.` };
  }

  const [admin] = await db.select().from(schema.admins).where(eq(schema.admins.email, email));
  // Check a password even for unknown emails, so response times don't reveal which emails are admins.
  const valid = await verifyPassword(password, admin?.passwordHash ?? (await dummyHash()));
  if (!admin || !valid) {
    // A lock that has run out starts the count again.
    const failures = attempts && lockedUntil! > new Date() ? attempts.failures + 1 : 1;
    await db
      .insert(schema.loginAttempts)
      .values({ email, failures, lastFailureAt: new Date() })
      .onConflictDoUpdate({ target: schema.loginAttempts.email, set: { failures, lastFailureAt: new Date() } });
    return { message: 'That email and password don’t match.' };
  }

  await db.delete(schema.loginAttempts).where(eq(schema.loginAttempts.email, email));
  await createSession(admin.id);
  redirect('/admin');
}

export async function logout() {
  await deleteSession();
  redirect('/admin/login');
}

const NewAdmin = z.object({
  name: z.string().trim().min(1, 'Enter a name.').max(100),
  email: z.email('Enter a valid email address.').max(200),
  password: Password,
});

/** First-run only: creates the first admin when none exist, guarded by ADMIN_SETUP_TOKEN. */
export async function setupFirstAdmin(_state: FormState, formData: FormData): Promise<FormState> {
  const expected = process.env.ADMIN_SETUP_TOKEN;
  if (!expected) return { message: 'Set ADMIN_SETUP_TOKEN in the environment first.' };
  if (text(formData, 'token') !== expected) return { message: 'The setup token is not correct.' };

  const db = await getDb();
  const [{ total }] = await db.select({ total: count() }).from(schema.admins);
  if (total > 0) redirect('/admin/login');

  const parsed = NewAdmin.safeParse({
    name: text(formData, 'name'),
    email: text(formData, 'email').toLowerCase(),
    password: String(formData.get('password') ?? ''),
  });
  if (!parsed.success) return { message: parsed.error.issues[0].message };

  const [admin] = await db
    .insert(schema.admins)
    .values({ name: parsed.data.name, email: parsed.data.email, passwordHash: await hashPassword(parsed.data.password) })
    .returning({ id: schema.admins.id });
  await createSession(admin.id);
  redirect('/admin');
}

export async function addAdmin(_state: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const parsed = NewAdmin.safeParse({
    name: text(formData, 'name'),
    email: text(formData, 'email').toLowerCase(),
    password: String(formData.get('password') ?? ''),
  });
  if (!parsed.success) return { message: parsed.error.issues[0].message };
  const db = await getDb();
  const inserted = await db
    .insert(schema.admins)
    .values({ name: parsed.data.name, email: parsed.data.email, passwordHash: await hashPassword(parsed.data.password) })
    .onConflictDoNothing()
    .returning({ id: schema.admins.id });
  if (!inserted.length) return { message: 'There is already an admin with that email.' };
  revalidatePath('/admin/admins');
  return { ok: true, message: `${parsed.data.name} can now sign in.` };
}

export async function removeAdmin(formData: FormData) {
  const me = await requireAdmin();
  const id = text(formData, 'id');
  // You can't remove yourself, so there is always at least one admin.
  if (id === me.id) return;
  const db = await getDb();
  await db.delete(schema.admins).where(and(eq(schema.admins.id, id), ne(schema.admins.id, me.id)));
  revalidatePath('/admin/admins');
}

export async function changePassword(_state: FormState, formData: FormData): Promise<FormState> {
  const me = await requireAdmin();
  const db = await getDb();
  const [admin] = await db.select().from(schema.admins).where(eq(schema.admins.id, me.id));
  if (!(await verifyPassword(String(formData.get('current') ?? ''), admin.passwordHash))) {
    return { message: 'Your current password is not correct.' };
  }
  const parsed = Password.safeParse(String(formData.get('password') ?? ''));
  if (!parsed.success) return { message: parsed.error.issues[0].message };
  await db.update(schema.admins).set({ passwordHash: await hashPassword(parsed.data) }).where(eq(schema.admins.id, me.id));
  return { ok: true, message: 'Password updated.' };
}

const Status = z.enum(schema.applicationStatus.enumValues);

export async function updateApplication(_state: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const id = text(formData, 'id');
  const status = Status.safeParse(text(formData, 'status'));
  if (!status.success) return { message: 'Choose a status.' };
  const notes = String(formData.get('notes') ?? '').slice(0, 5000);
  const db = await getDb();
  await db.update(schema.applications).set({ status: status.data, notes }).where(eq(schema.applications.id, id));
  revalidatePath('/admin', 'layout');
  return { ok: true, message: 'Saved.' };
}

export async function deleteApplication(formData: FormData) {
  await requireAdmin();
  const db = await getDb();
  await db.delete(schema.applications).where(eq(schema.applications.id, text(formData, 'id')));
  revalidatePath('/admin', 'layout');
  redirect('/admin/applications');
}

export async function deleteSubscriber(formData: FormData) {
  await requireAdmin();
  const db = await getDb();
  await db.delete(schema.subscribers).where(eq(schema.subscribers.id, text(formData, 'id')));
  revalidatePath('/admin/subscribers');
}


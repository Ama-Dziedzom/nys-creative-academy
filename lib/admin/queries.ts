import 'server-only';
import { and, count, desc, eq, gt, ilike, or, type SQL } from 'drizzle-orm';
import { requireAdmin } from '@/lib/auth/dal';
import { getDb, schema } from '@/lib/db';
import type { ApplicationStatus } from '@/lib/db/schema';

export const PAGE_SIZE = 50;

export type ApplicationFilters = { q?: string; status?: string; academy?: string; page?: number };

function applicationWhere({ q, status, academy }: ApplicationFilters) {
  const conditions: SQL[] = [];
  if (q) {
    const term = `%${q.replace(/[%_\\]/g, '\\$&')}%`;
    conditions.push(
      or(
        ilike(schema.applications.firstName, term),
        ilike(schema.applications.lastName, term),
        ilike(schema.applications.email, term),
        ilike(schema.applications.phone, term),
      )!,
    );
  }
  if (status && (schema.applicationStatus.enumValues as readonly string[]).includes(status)) {
    conditions.push(eq(schema.applications.status, status as ApplicationStatus));
  }
  if (academy) conditions.push(eq(schema.applications.academy, academy));
  return conditions.length ? and(...conditions) : undefined;
}

export async function listApplications(filters: ApplicationFilters) {
  await requireAdmin();
  const db = await getDb();
  const where = applicationWhere(filters);
  const page = Math.max(1, filters.page ?? 1);
  const [rows, [{ total }]] = await Promise.all([
    db
      .select()
      .from(schema.applications)
      .where(where)
      .orderBy(desc(schema.applications.createdAt))
      .limit(PAGE_SIZE)
      .offset((page - 1) * PAGE_SIZE),
    db.select({ total: count() }).from(schema.applications).where(where),
  ]);
  return { rows, total, page };
}

/** Every matching application, for CSV export. */
export async function allApplications(filters: ApplicationFilters) {
  await requireAdmin();
  const db = await getDb();
  return db.select().from(schema.applications).where(applicationWhere(filters)).orderBy(desc(schema.applications.createdAt));
}

export async function getApplication(id: string) {
  await requireAdmin();
  if (!/^[0-9a-f-]{36}$/i.test(id)) return null;
  const db = await getDb();
  const [row] = await db.select().from(schema.applications).where(eq(schema.applications.id, id));
  return row ?? null;
}

export async function listSubscribers() {
  await requireAdmin();
  const db = await getDb();
  return db.select().from(schema.subscribers).orderBy(desc(schema.subscribers.createdAt));
}

export async function listAdmins() {
  await requireAdmin();
  const db = await getDb();
  return db
    .select({ id: schema.admins.id, name: schema.admins.name, email: schema.admins.email, createdAt: schema.admins.createdAt })
    .from(schema.admins)
    .orderBy(schema.admins.createdAt);
}

export async function getOverview() {
  await requireAdmin();
  const db = await getDb();
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const [byStatus, byAcademy, [{ subscribers }], [{ thisWeek }], recent] = await Promise.all([
    db.select({ status: schema.applications.status, total: count() }).from(schema.applications).groupBy(schema.applications.status),
    db.select({ academy: schema.applications.academy, total: count() }).from(schema.applications).groupBy(schema.applications.academy),
    db.select({ subscribers: count() }).from(schema.subscribers),
    db.select({ thisWeek: count() }).from(schema.applications).where(gt(schema.applications.createdAt, weekAgo)),
    db.select().from(schema.applications).orderBy(desc(schema.applications.createdAt)).limit(6),
  ]);
  return { byStatus, byAcademy, subscribers, recent, thisWeek };
}

export async function countAdmins() {
  const db = await getDb();
  const [{ total }] = await db.select({ total: count() }).from(schema.admins);
  return total;
}

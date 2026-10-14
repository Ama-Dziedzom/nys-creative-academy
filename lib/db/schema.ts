import { index, integer, pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const applicationStatus = pgEnum('application_status', ['new', 'reviewing', 'accepted', 'declined']);

/** Submissions from the Apply page. */
export const applications = pgTable(
  'applications',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    firstName: text('first_name').notNull(),
    lastName: text('last_name').notNull(),
    email: text('email').notNull(),
    phone: text('phone').notNull(),
    academy: text('academy').notNull(),
    track: text('track').notNull(),
    motivation: text('motivation').notNull().default(''),
    status: applicationStatus('status').notNull().default('new'),
    /** Private notes from the admins; never shown to the applicant. */
    notes: text('notes').notNull().default(''),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index('applications_created_at_idx').on(table.createdAt), index('applications_status_idx').on(table.status)],
);

/** Newsletter sign-ups from the footer. */
export const subscribers = pgTable('subscribers', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const admins = pgTable('admins', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

/** One row per signed-in browser. Only a hash of the cookie token is stored. */
export const sessions = pgTable('sessions', {
  tokenHash: text('token_hash').primaryKey(),
  adminId: uuid('admin_id')
    .notNull()
    .references(() => admins.id, { onDelete: 'cascade' }),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
});

/** Failed sign-ins per email, used to slow down password guessing. */
export const loginAttempts = pgTable('login_attempts', {
  email: text('email').primaryKey(),
  failures: integer('failures').notNull().default(0),
  lastFailureAt: timestamp('last_failure_at', { withTimezone: true }).notNull().defaultNow(),
});

export type Application = typeof applications.$inferSelect;
export type ApplicationStatus = (typeof applicationStatus.enumValues)[number];
export type Subscriber = typeof subscribers.$inferSelect;
export type Admin = typeof admins.$inferSelect;

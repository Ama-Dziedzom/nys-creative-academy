'use server';

import * as z from 'zod';
import { getAcademies } from '@/content';
import { getDb, schema } from '@/lib/db';

export type ApplicationFields = 'firstName' | 'lastName' | 'email' | 'phone' | 'academy' | 'track' | 'motivation';

export type ApplicationState = {
  ok?: boolean;
  message?: string;
  errors?: Partial<Record<ApplicationFields, string>>;
  /** What was submitted, so the form keeps the visitor's answers after an error. */
  values?: Partial<Record<ApplicationFields, string>>;
};

const ApplicationSchema = z.object({
  firstName: z.string().trim().min(1, 'Enter your first name.').max(100),
  lastName: z.string().trim().min(1, 'Enter your last name.').max(100),
  email: z.email('Enter a valid email address.').trim().max(200),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s()-]{7,20}$/, 'Enter a valid phone number.'),
  academy: z.string().min(1, 'Choose an academy.'),
  track: z.string().min(1, 'Choose a track.'),
  motivation: z.string().trim().max(3000, 'Please keep this under 3,000 characters.'),
});

const text = (formData: FormData, name: string) => String(formData.get(name) ?? '');

export async function submitApplication(_state: ApplicationState, formData: FormData): Promise<ApplicationState> {
  const values = {
    firstName: text(formData, 'firstName'),
    lastName: text(formData, 'lastName'),
    email: text(formData, 'email'),
    phone: text(formData, 'phone'),
    academy: text(formData, 'academy'),
    track: text(formData, 'track'),
    motivation: text(formData, 'motivation'),
  };
  // Hidden field that people never see; bots that fill it get a quiet "success".
  if (text(formData, 'website')) return { ok: true };

  const parsed = ApplicationSchema.safeParse(values);
  const errors: ApplicationState['errors'] = {};
  if (!parsed.success) {
    for (const issue of parsed.error.issues) errors[issue.path[0] as ApplicationFields] ??= issue.message;
  }
  // The track must belong to the chosen academy.
  const academy = (await getAcademies()).find((item) => item.slug === values.academy);
  if (values.academy && !academy) errors.academy = 'Choose an academy.';
  if (academy && values.track && !academy.tracks.some((track) => track.name === values.track)) errors.track = 'Choose a track.';
  if (!parsed.success || Object.keys(errors).length) return { errors, values };

  try {
    const db = await getDb();
    await db.insert(schema.applications).values(parsed.data);
  } catch (error) {
    console.error('Saving application failed', error);
    return { message: 'Something went wrong sending your application. Please try again.', values };
  }
  return { ok: true };
}

export type SubscribeState = { ok?: boolean; message?: string; email?: string };

export async function subscribe(_state: SubscribeState, formData: FormData): Promise<SubscribeState> {
  const email = text(formData, 'email');
  if (text(formData, 'website')) return { ok: true };
  const parsed = z.email().max(200).safeParse(email.trim().toLowerCase());
  if (!parsed.success) return { message: 'Enter a valid email address.', email };
  try {
    const db = await getDb();
    // Signing up twice is fine: the second time changes nothing.
    await db.insert(schema.subscribers).values({ email: parsed.data }).onConflictDoNothing();
  } catch (error) {
    console.error('Saving subscriber failed', error);
    return { message: 'Something went wrong. Please try again.', email };
  }
  return { ok: true };
}

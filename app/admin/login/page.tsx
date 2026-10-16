import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { AuthField } from '@/components/admin/AuthField';
import { AuthShell } from '@/components/admin/AuthShell';
import { StatefulForm } from '@/components/admin/StatefulForm';
import { login } from '@/lib/admin/actions';
import { countAdmins } from '@/lib/admin/queries';
import { readSession } from '@/lib/auth/session';

export const metadata: Metadata = { title: 'Sign in' };

export default async function LoginPage() {
  if (await readSession()) redirect('/admin');
  if ((await countAdmins()) === 0) redirect('/admin/setup');
  return (
    <AuthShell>
      <h1>Welcome back</h1>
      <p>Sign in to manage applications and subscribers.</p>
      <StatefulForm action={login} submitLabel="Sign in">
        <AuthField label="Email" icon="mail-01" required type="email" name="email" autoComplete="username" placeholder="you@example.com" />
        <AuthField label="Password" icon="lock-password" required type="password" name="password" autoComplete="current-password" placeholder="••••••••••" />
      </StatefulForm>
    </AuthShell>
  );
}

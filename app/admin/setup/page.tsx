import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { AuthField } from '@/components/admin/AuthField';
import { AuthShell } from '@/components/admin/AuthShell';
import { StatefulForm } from '@/components/admin/StatefulForm';
import { setupFirstAdmin } from '@/lib/admin/actions';
import { countAdmins } from '@/lib/admin/queries';

export const metadata: Metadata = { title: 'Set up' };

/** Only reachable until the first admin exists. */
export default async function SetupPage() {
  if ((await countAdmins()) > 0) redirect('/admin/login');
  return (
    <AuthShell>
      <h1>Create the first admin</h1>
      <p>Enter the setup token from the ADMIN_SETUP_TOKEN environment variable. You can add the second admin once you’re in.</p>
      <StatefulForm action={setupFirstAdmin} submitLabel="Create admin">
        <AuthField label="Setup token" icon="key-01" required type="password" name="token" autoComplete="off" />
        <AuthField label="Your name" icon="shield-user" required name="name" autoComplete="name" />
        <AuthField label="Email" icon="mail-01" required type="email" name="email" autoComplete="username" />
        <AuthField
          label="Password"
          hint="At least 10 characters"
          icon="lock-password"
          required
          type="password"
          name="password"
          minLength={10}
          autoComplete="new-password"
        />
      </StatefulForm>
    </AuthShell>
  );
}

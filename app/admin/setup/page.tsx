import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { StatefulForm } from '@/components/admin/StatefulForm';
import { setupFirstAdmin } from '@/lib/admin/actions';
import { countAdmins } from '@/lib/admin/queries';

export const metadata: Metadata = { title: 'Set up' };

/** Only reachable until the first admin exists. */
export default async function SetupPage() {
  if ((await countAdmins()) > 0) redirect('/admin/login');
  return (
    <main className="auth-page">
      <div className="auth-card">
        <span className="admin-mark">NYS</span>
        <h1>Create the first admin</h1>
        <p>Enter the setup token from the ADMIN_SETUP_TOKEN environment variable. You can add the second admin once you’re in.</p>
        <StatefulForm action={setupFirstAdmin} submitLabel="Create admin">
          <label>
            Setup token
            <input required type="password" name="token" autoComplete="off" />
          </label>
          <label>
            Your name
            <input required name="name" autoComplete="name" />
          </label>
          <label>
            Email
            <input required type="email" name="email" autoComplete="username" />
          </label>
          <label>
            Password <small>At least 10 characters</small>
            <input required type="password" name="password" minLength={10} autoComplete="new-password" />
          </label>
        </StatefulForm>
      </div>
    </main>
  );
}

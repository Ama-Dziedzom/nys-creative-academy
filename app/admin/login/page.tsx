import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { StatefulForm } from '@/components/admin/StatefulForm';
import { login } from '@/lib/admin/actions';
import { countAdmins } from '@/lib/admin/queries';
import { readSession } from '@/lib/auth/session';

export const metadata: Metadata = { title: 'Sign in' };

export default async function LoginPage() {
  if (await readSession()) redirect('/admin');
  if ((await countAdmins()) === 0) redirect('/admin/setup');
  return (
    <main className="auth-page">
      <div className="auth-card">
        <span className="admin-mark">NYS</span>
        <h1>Sign in</h1>
        <p>NYS Creative Academy admin</p>
        <StatefulForm action={login} submitLabel="Sign in">
          <label>
            Email
            <input required type="email" name="email" autoComplete="username" />
          </label>
          <label>
            Password
            <input required type="password" name="password" autoComplete="current-password" />
          </label>
        </StatefulForm>
      </div>
    </main>
  );
}

import type { Metadata } from 'next';
import { ConfirmButton } from '@/components/admin/ConfirmButton';
import { formatDate } from '@/components/admin/format';
import { StatefulForm } from '@/components/admin/StatefulForm';
import { addAdmin, changePassword, removeAdmin } from '@/lib/admin/actions';
import { listAdmins } from '@/lib/admin/queries';
import { requireAdmin } from '@/lib/auth/dal';

export const metadata: Metadata = { title: 'Admins' };

export default async function AdminsPage() {
  const [me, admins] = await Promise.all([requireAdmin(), listAdmins()]);
  return (
    <>
      <header className="admin-header">
        <h1>Admins</h1>
      </header>
      <div className="detail-grid">
        <section className="admin-card flush">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Added</th>
                <th>
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.id}>
                  <td>
                    <b>
                      {admin.name}
                      {admin.id === me.id && <span className="you">You</span>}
                    </b>
                    <small>{admin.email}</small>
                  </td>
                  <td className="nowrap">{formatDate(admin.createdAt)}</td>
                  <td className="actions">
                    {admin.id !== me.id && (
                      <form action={removeAdmin}>
                        <input type="hidden" name="id" value={admin.id} />
                        <ConfirmButton className="text-button danger" aria-label={`Remove ${admin.name}`} message={`Remove ${admin.name}? They will no longer be able to sign in.`}>
                          Remove
                        </ConfirmButton>
                      </form>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <div className="stack">
          <section className="admin-card">
            <h2>Add an admin</h2>
            <StatefulForm action={addAdmin} submitLabel="Add admin">
              <label>
                Name
                <input required name="name" autoComplete="off" />
              </label>
              <label>
                Email
                <input required type="email" name="email" autoComplete="off" />
              </label>
              <label>
                Temporary password <small>At least 10 characters. Share it privately; they can change it after signing in.</small>
                <input required type="password" name="password" minLength={10} autoComplete="new-password" />
              </label>
            </StatefulForm>
          </section>
          <section className="admin-card">
            <h2>Change your password</h2>
            <StatefulForm action={changePassword} submitLabel="Update password">
              <label>
                Current password
                <input required type="password" name="current" autoComplete="current-password" />
              </label>
              <label>
                New password <small>At least 10 characters</small>
                <input required type="password" name="password" minLength={10} autoComplete="new-password" />
              </label>
            </StatefulForm>
          </section>
        </div>
      </div>
    </>
  );
}

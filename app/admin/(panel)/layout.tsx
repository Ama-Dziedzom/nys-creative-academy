import type { ReactNode } from 'react';
import { AdminNav } from '@/components/admin/AdminNav';
import { logout } from '@/lib/admin/actions';
import { requireAdmin } from '@/lib/auth/dal';

// Shows who is signed in. Each page and action still checks the session itself.
export default async function PanelLayout({ children }: { children: ReactNode }) {
  const admin = await requireAdmin();
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <a className="admin-brand" href="/" target="_blank" rel="noreferrer">
          <span className="admin-mark">NYS</span>
          <span>
            Creative Academy
            <small>View site ↗</small>
          </span>
        </a>
        <AdminNav />
        <div className="admin-user">
          <span>
            {admin.name}
            <small>{admin.email}</small>
          </span>
          <form action={logout}>
            <button type="submit" aria-label="Sign out" title="Sign out">
              <i className="hgi-stroke hgi-logout-01" aria-hidden="true" />
            </button>
          </form>
        </div>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}

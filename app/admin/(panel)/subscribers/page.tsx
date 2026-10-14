import type { Metadata } from 'next';
import { ConfirmButton } from '@/components/admin/ConfirmButton';
import { formatDateTime } from '@/components/admin/format';
import { deleteSubscriber } from '@/lib/admin/actions';
import { listSubscribers } from '@/lib/admin/queries';

export const metadata: Metadata = { title: 'Subscribers' };

export default async function SubscribersPage() {
  const rows = await listSubscribers();
  return (
    <>
      <header className="admin-header">
        <h1>Subscribers</h1>
        <a className="admin-button quiet" href="/admin/subscribers/export">
          <i className="hgi-stroke hgi-download-01" aria-hidden="true" /> Export CSV
        </a>
      </header>
      <section className="admin-card flush">
        {rows.length ? (
          <div className="table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Signed up</th>
                  <th>
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <a href={`mailto:${row.email}`}>{row.email}</a>
                    </td>
                    <td className="nowrap">{formatDateTime(row.createdAt)}</td>
                    <td className="actions">
                      <form action={deleteSubscriber}>
                        <input type="hidden" name="id" value={row.id} />
                        <ConfirmButton className="text-button danger" aria-label={`Remove ${row.email}`} message={`Remove ${row.email} from the list?`}>
                          Remove
                        </ConfirmButton>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="empty">No subscribers yet. Sign-ups from the footer newsletter form appear here.</p>
        )}
      </section>
      <footer className="pager">
        <span>
          {rows.length} {rows.length === 1 ? 'subscriber' : 'subscribers'}
        </span>
      </footer>
    </>
  );
}

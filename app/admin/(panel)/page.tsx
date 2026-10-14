import type { Metadata } from 'next';
import Link from 'next/link';
import { formatDateTime, STATUS_LABELS } from '@/components/admin/format';
import { getAcademies } from '@/content';
import { getOverview } from '@/lib/admin/queries';
import { applicationStatus } from '@/lib/db/schema';

export const metadata: Metadata = { title: 'Overview' };

export default async function OverviewPage() {
  const [{ byStatus, byAcademy, subscribers, recent, thisWeek }, academies] = await Promise.all([getOverview(), getAcademies()]);
  const statusCount = (status: string) => byStatus.find((row) => row.status === status)?.total ?? 0;
  const total = byStatus.reduce((sum, row) => sum + row.total, 0);
  const academyName = (slug: string) => academies.find((academy) => academy.slug === slug)?.name ?? slug;

  return (
    <>
      <header className="admin-header">
        <h1>Overview</h1>
      </header>
      <section className="stat-grid">
        <Link className="stat" href="/admin/applications?status=new">
          <span>New applications</span>
          <b>{statusCount('new')}</b>
        </Link>
        <Link className="stat" href="/admin/applications">
          <span>All applications</span>
          <b>{total}</b>
          <small>{thisWeek} in the last 7 days</small>
        </Link>
        <Link className="stat" href="/admin/subscribers">
          <span>Newsletter subscribers</span>
          <b>{subscribers}</b>
        </Link>
      </section>

      <div className="overview-grid">
        <section className="admin-card">
          <div className="card-head">
            <h2>Latest applications</h2>
            <Link href="/admin/applications">View all</Link>
          </div>
          {recent.length ? (
            <ul className="recent-list">
              {recent.map((row) => (
                <li key={row.id}>
                  <Link href={`/admin/applications/${row.id}`}>
                    <span>
                      <b>
                        {row.firstName} {row.lastName}
                      </b>
                      <small>
                        {academyName(row.academy)} · {row.track}
                      </small>
                    </span>
                    <span className={`status status-${row.status}`}>{STATUS_LABELS[row.status]}</span>
                    <time>{formatDateTime(row.createdAt)}</time>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty">No applications yet. They’ll appear here as soon as someone applies.</p>
          )}
        </section>

        <section className="admin-card">
          <div className="card-head">
            <h2>Pipeline</h2>
          </div>
          <dl className="breakdown">
            {applicationStatus.enumValues.map((status) => (
              <div key={status}>
                <dt>
                  <Link href={`/admin/applications?status=${status}`}>{STATUS_LABELS[status]}</Link>
                </dt>
                <dd>{statusCount(status)}</dd>
              </div>
            ))}
          </dl>
          <div className="card-head">
            <h2>By academy</h2>
          </div>
          <dl className="breakdown">
            {academies.map((academy) => (
              <div key={academy.slug}>
                <dt>
                  <Link href={`/admin/applications?academy=${academy.slug}`}>{academy.name}</Link>
                </dt>
                <dd>{byAcademy.find((row) => row.academy === academy.slug)?.total ?? 0}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </>
  );
}

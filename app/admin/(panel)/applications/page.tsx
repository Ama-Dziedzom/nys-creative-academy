import type { Metadata } from 'next';
import Link from 'next/link';
import { formatDateTime, STATUS_LABELS } from '@/components/admin/format';
import { getAcademies } from '@/content';
import { listApplications, PAGE_SIZE } from '@/lib/admin/queries';
import { applicationStatus } from '@/lib/db/schema';

export const metadata: Metadata = { title: 'Applications' };

type Search = { q?: string; status?: string; academy?: string; page?: string };

export default async function ApplicationsPage({ searchParams }: { searchParams: Promise<Search> }) {
  const search = await searchParams;
  const filters = { q: search.q?.trim(), status: search.status, academy: search.academy, page: Number(search.page) || 1 };
  const [{ rows, total, page }, academies] = await Promise.all([listApplications(filters), getAcademies()]);
  const academyName = (slug: string) => academies.find((academy) => academy.slug === slug)?.name ?? slug;
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const query = (overrides: Record<string, string | number | undefined>) => {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries({ q: filters.q, status: filters.status, academy: filters.academy, ...overrides })) {
      if (value) params.set(key, String(value));
    }
    const string = params.toString();
    return string ? `?${string}` : '';
  };
  const filtered = Boolean(filters.q || filters.status || filters.academy);

  return (
    <>
      <header className="admin-header">
        <h1>Applications</h1>
        <a className="admin-button quiet" href={`/admin/applications/export${query({ page: undefined })}`}>
          <i className="hgi-stroke hgi-download-01" aria-hidden="true" /> Export CSV
        </a>
      </header>

      <form className="filters" role="search">
        <label className="search">
          <i className="hgi-stroke hgi-search-01" aria-hidden="true" />
          <input name="q" type="search" placeholder="Search name, email or phone" defaultValue={filters.q} aria-label="Search" />
        </label>
        <select name="status" defaultValue={filters.status ?? ''} aria-label="Status">
          <option value="">All statuses</option>
          {applicationStatus.enumValues.map((status) => (
            <option key={status} value={status}>
              {STATUS_LABELS[status]}
            </option>
          ))}
        </select>
        <select name="academy" defaultValue={filters.academy ?? ''} aria-label="Academy">
          <option value="">All academies</option>
          {academies.map((academy) => (
            <option key={academy.slug} value={academy.slug}>
              {academy.name}
            </option>
          ))}
        </select>
        <button className="admin-button" type="submit">
          Filter
        </button>
        {filtered && (
          <Link className="clear" href="/admin/applications">
            Clear
          </Link>
        )}
      </form>

      <section className="admin-card flush">
        {rows.length ? (
          <div className="table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Applicant</th>
                  <th>Academy and track</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th>Received</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <Link href={`/admin/applications/${row.id}`}>
                        <b>
                          {row.firstName} {row.lastName}
                        </b>
                        <small>{row.email}</small>
                      </Link>
                    </td>
                    <td>
                      {academyName(row.academy)}
                      <small>{row.track}</small>
                    </td>
                    <td>{row.phone}</td>
                    <td>
                      <span className={`status status-${row.status}`}>{STATUS_LABELS[row.status]}</span>
                    </td>
                    <td className="nowrap">{formatDateTime(row.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="empty">{filtered ? 'No applications match these filters.' : 'No applications yet.'}</p>
        )}
      </section>

      <footer className="pager">
        <span>
          {total} {total === 1 ? 'application' : 'applications'}
        </span>
        {pages > 1 && (
          <span className="pager-links">
            {page > 1 && <Link href={`/admin/applications${query({ page: page - 1 })}`}>Previous</Link>}
            <span>
              Page {page} of {pages}
            </span>
            {page < pages && <Link href={`/admin/applications${query({ page: page + 1 })}`}>Next</Link>}
          </span>
        )}
      </footer>
    </>
  );
}

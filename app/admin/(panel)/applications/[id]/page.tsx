import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { formatDateTime, STATUS_LABELS } from '@/components/admin/format';
import { ConfirmButton } from '@/components/admin/ConfirmButton';
import { StatefulForm } from '@/components/admin/StatefulForm';
import { getAcademies } from '@/content';
import { deleteApplication, updateApplication } from '@/lib/admin/actions';
import { getApplication } from '@/lib/admin/queries';
import { applicationStatus } from '@/lib/db/schema';

export const metadata: Metadata = { title: 'Application' };

export default async function ApplicationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [application, academies] = await Promise.all([getApplication(id), getAcademies()]);
  if (!application) notFound();
  const academy = academies.find((item) => item.slug === application.academy)?.name ?? application.academy;

  return (
    <>
      <Link className="back-link" href="/admin/applications">
        <i className="hgi-stroke hgi-arrow-left-01" aria-hidden="true" /> Applications
      </Link>
      <header className="admin-header">
        <h1>
          {application.firstName} {application.lastName}
        </h1>
        <span className={`status status-${application.status}`}>{STATUS_LABELS[application.status]}</span>
      </header>

      <div className="detail-grid">
        <section className="admin-card">
          <dl className="details">
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${application.email}`}>{application.email}</a>
              </dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>
                <a href={`tel:${application.phone.replace(/[^\d+]/g, '')}`}>{application.phone}</a>
              </dd>
            </div>
            <div>
              <dt>Academy</dt>
              <dd>{academy}</dd>
            </div>
            <div>
              <dt>Track</dt>
              <dd>{application.track}</dd>
            </div>
            <div>
              <dt>Received</dt>
              <dd>{formatDateTime(application.createdAt)}</dd>
            </div>
            <div className="wide">
              <dt>Why this programme matters to them</dt>
              <dd className="prose-text">{application.motivation || <em>No answer given.</em>}</dd>
            </div>
          </dl>
        </section>

        <aside className="admin-card">
          <h2>Review</h2>
          <StatefulForm action={updateApplication} submitLabel="Save">
            <input type="hidden" name="id" value={application.id} />
            <label>
              Status
              <select name="status" defaultValue={application.status}>
                {applicationStatus.enumValues.map((status) => (
                  <option key={status} value={status}>
                    {STATUS_LABELS[status]}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Notes <small>Only admins see these</small>
              <textarea name="notes" rows={6} defaultValue={application.notes} />
            </label>
          </StatefulForm>
          <form action={deleteApplication} className="danger-zone">
            <input type="hidden" name="id" value={application.id} />
            <ConfirmButton className="text-button danger" message="Delete this application? This can’t be undone.">
              <i className="hgi-stroke hgi-delete-02" aria-hidden="true" /> Delete application
            </ConfirmButton>
          </form>
        </aside>
      </div>
    </>
  );
}

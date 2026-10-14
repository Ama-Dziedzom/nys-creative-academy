import type { Metadata } from 'next';
import { ButtonLink } from '@/components/ButtonLink';
import { Footer } from '@/components/Footer';
import { PageHero } from '@/components/PageHero';
import { getAcademies, getAcademiesPage, getSiteSettings } from '@/content';

export const metadata: Metadata = { title: 'Academies' };

export default async function AcademiesPage() {
  const [{ hero, cta }, academies, settings] = await Promise.all([getAcademiesPage(), getAcademies(), getSiteSettings()]);
  return (
    <>
      <main>
        <PageHero hero={hero} />
        <section className="page-section">
          <div className="academy-stack">
            {academies.map((academy) => (
              <article key={academy.slug} id={academy.slug} className={`detail-card detail-${academy.slug}`}>
                <p className="eyebrow">{academy.label}</p>
                <h2>{academy.title}</h2>
                <p>{academy.description}</p>
                {academy.tracks.every((track) => track.description) && (
                  <div className="subtracks">
                    {academy.tracks.map((track) => (
                      <div key={track.name} className="subtrack">
                        <b>{track.name}</b>
                        <p>{track.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
          <ButtonLink link={cta} variant="primary" icon="arrow-right-02" className="page-footer-link" />
        </section>
      </main>
      <Footer settings={settings} />
    </>
  );
}

import type { Metadata } from 'next';
import { ButtonLink } from '@/components/ButtonLink';
import { Footer } from '@/components/Footer';
import { PageHero } from '@/components/PageHero';
import { getSiteSettings, getSupportPage } from '@/content';

export const metadata: Metadata = { title: 'Support' };

export default async function SupportPage() {
  const [{ hero, eyebrow, title, options, cta }, settings] = await Promise.all([getSupportPage(), getSiteSettings()]);
  return (
    <>
      <main>
        <PageHero hero={hero} />
        <section className="page-section">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="section-heading-title">{title}</h2>
          <div className="support-options">
            {options.map((option, index) => (
              <article key={option.title} className="support-option">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{option.title}</h3>
                <p>{option.text}</p>
              </article>
            ))}
          </div>
          <ButtonLink link={cta} variant="primary" icon="arrow-up-right-01" className="page-footer-link" />
        </section>
      </main>
      <Footer settings={settings} showCta={false} />
    </>
  );
}

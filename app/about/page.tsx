import type { Metadata } from 'next';
import { Footer } from '@/components/Footer';
import { HeadingText } from '@/components/Lines';
import { PageHero } from '@/components/PageHero';
import { getAboutPage, getSiteSettings } from '@/content';

export const metadata: Metadata = { title: 'About' };

export default async function AboutPage() {
  const [{ hero, initiative, founder }, settings] = await Promise.all([getAboutPage(), getSiteSettings()]);
  return (
    <>
      <main>
        <PageHero hero={hero} />
        <section className="page-section split-content">
          <div>
            <p className="eyebrow">{initiative.eyebrow}</p>
            <h2>
              <HeadingText heading={initiative.title} />
            </h2>
          </div>
          <div className="prose">
            {initiative.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>
        <section className="page-section split-content">
          <div className="founder-card">
            <img src={founder.image.src} alt={founder.image.alt} />
            <div>
              <p>{founder.role}</p>
              <h3>{founder.name}</h3>
            </div>
          </div>
          <div className="prose">
            <p className="eyebrow">{founder.eyebrow}</p>
            <h2>
              <HeadingText heading={founder.title} />
            </h2>
            <p>{founder.text}</p>
          </div>
        </section>
      </main>
      <Footer settings={settings} />
    </>
  );
}

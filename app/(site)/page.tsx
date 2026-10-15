import Link from 'next/link';
import { ButtonLink } from '@/components/ButtonLink';
import { Footer } from '@/components/Footer';
import { Icon } from '@/components/Icon';
import { HeadingText } from '@/components/Lines';
import { getHomePage, getSiteSettings } from '@/content';

export default async function HomePage() {
  const [{ hero, mission, paths, applyBand }, settings] = await Promise.all([getHomePage(), getSiteSettings()]);
  // The ticker needs at least 8 cards to fill its arc, so the photos repeat.
  const reel = Array.from({ length: Math.ceil(8 / hero.gallery.length) * hero.gallery.length }, (_, i) => hero.gallery[i % hero.gallery.length]);
  return (
    <>
      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <h2 id="hero-title">
              <HeadingText heading={hero.title} />
            </h2>
            <p className="hero-text">{hero.text}</p>
            <div className="hero-actions">
              <ButtonLink link={hero.primaryCta} variant="primary" icon="arrow-right-02" />
              <ButtonLink link={hero.secondaryCta} variant="quiet" />
            </div>
          </div>
          <div className="hero-gallery">
            <div className="hero-gallery-track" style={{ '--n': reel.length } as React.CSSProperties}>
              {reel.map((image, index) => (
                <figure
                  key={`${image.src}-${index}`}
                  aria-hidden={index >= hero.gallery.length || undefined}
                  style={{ '--i': index } as React.CSSProperties}
                >
                  <img src={image.src} alt={index < hero.gallery.length ? image.alt : ''} title={image.credit} />
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="intro-grid">
          <div>
            <h2>
              <HeadingText heading={mission.title} />
            </h2>
          </div>
          <p className="intro-text">{mission.text}</p>
        </section>

        <section id="academies" className="paths">
          <div className="section-heading">
            <div>
              <p className="eyebrow">{paths.eyebrow}</p>
              <h2>
                <HeadingText heading={paths.title} />
              </h2>
            </div>
            <Link href={paths.link.href} className="text-link">
              {paths.link.label}{' '}
              <span>
                <Icon name="arrow-right-02" />
              </span>
            </Link>
          </div>
          <div className="path-grid">
            {paths.items.map((path) => (
              <article key={path.academy} className={`path path-${path.academy}`}>
                <p>{path.label}</p>
                <h3>
                  <HeadingText heading={path.title} />
                </h3>
                <span>{path.summary}</span>
                <Link href={`/academies#${path.academy}`} aria-label={`Explore ${path.label}`}>
                  <Icon name="arrow-up-right-01" />
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section id="apply" className="apply-band">
          <div>
            <p className="eyebrow">{applyBand.eyebrow}</p>
            <h2>
              <HeadingText heading={applyBand.title} />
            </h2>
          </div>
          <ButtonLink link={applyBand.cta} variant="primary" icon="arrow-right-02" />
        </section>
      </main>
      <Footer settings={settings} />
    </>
  );
}

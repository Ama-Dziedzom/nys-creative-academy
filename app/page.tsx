import Link from 'next/link';
import { ButtonLink } from '@/components/ButtonLink';
import { Footer } from '@/components/Footer';
import { Icon } from '@/components/Icon';
import { HeadingText, Lines } from '@/components/Lines';
import { getHomePage, getSiteSettings } from '@/content';

export default async function HomePage() {
  const [{ hero, mission, paths, applyBand, supportBand }, settings] = await Promise.all([getHomePage(), getSiteSettings()]);
  return (
    <>
      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">{hero.eyebrow}</p>
            <h2 id="hero-title">
              <HeadingText heading={hero.title} />
            </h2>
            <p className="hero-text">{hero.text}</p>
            <div className="hero-actions">
              <ButtonLink link={hero.primaryCta} variant="primary" icon="arrow-right-02" />
              <ButtonLink link={hero.secondaryCta} variant="quiet" />
            </div>
            <div className="hero-proof">
              <span className="pulse" />
              <span>{hero.proof[0]}</span>
              <span className="divider" />
              <span>{hero.proof[1]}</span>
            </div>
          </div>
          <div className="hero-art">
            <img src={hero.image.src} alt={hero.image.alt} />
            <div className="art-label">
              <b>
                <Lines text={hero.imageLabel} />
              </b>
            </div>
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="star">
              <Icon name="sparkles" />
            </div>
          </div>
        </section>

        <section id="about" className="intro-grid">
          <p className="section-number">{mission.number}</p>
          <div>
            <p className="eyebrow">{mission.eyebrow}</p>
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
                <Link href={`/academies#${path.academy}`} aria-label={`Explore ${path.label.split(' / ')[1]}`}>
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

        <section id="support" className="support-band">
          <p className="eyebrow">{supportBand.eyebrow}</p>
          <h2>
            <HeadingText heading={supportBand.title} />
          </h2>
          <p className="support-copy">{supportBand.text}</p>
          <ButtonLink link={supportBand.cta} variant="light" icon="arrow-up-right-01" />
          {supportBand.note && <p className="support-note">{supportBand.note}</p>}
        </section>
      </main>
      <Footer settings={settings} showCopyright />
    </>
  );
}

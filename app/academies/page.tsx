import type { Metadata } from 'next';
import { ButtonLink } from '@/components/ButtonLink';
import { Footer } from '@/components/Footer';
import { Icon } from '@/components/Icon';
import { HeadingText } from '@/components/Lines';
import { PageHero } from '@/components/PageHero';
import { getAcademies, getAcademiesPage, getSiteSettings, type Academy, type Track } from '@/content';

export const metadata: Metadata = { title: 'Academies' };

type Card = {
  id?: string;
  tag: string;
  headline: string;
  text: string;
  details?: { curriculum?: string; learn?: string; careers?: string[] };
};

// The Creative Academy gets an intro card followed by a card per studio; the others get a single card each.
function toCards(academy: Academy): Card[] {
  const studios = academy.tracks.filter((track): track is Track & { headline: string; description: string } =>
    Boolean(track.headline && track.description),
  );
  const intro: Card = {
    id: academy.slug,
    tag: academy.title,
    headline: academy.headline,
    text: academy.description,
    details: studios.length ? undefined : { curriculum: academy.curriculum, learn: academy.learn, careers: academy.careers },
  };
  return [
    intro,
    ...studios.map((track) => ({
      tag: track.name,
      headline: track.headline,
      text: track.description,
      details: { learn: track.learn, careers: track.careers },
    })),
  ];
}

// Pastel tone and background shape for each card, in page order.
const LOOKS = ['red diamonds', 'sand arches', 'acid diamonds', 'peach arches', 'sky arches', 'purple diamonds'];

export default async function AcademiesPage() {
  const [{ hero, cta }, academies, settings] = await Promise.all([getAcademiesPage(), getAcademies(), getSiteSettings()]);
  const cards = academies.flatMap(toCards);
  return (
    <>
      <main>
        <PageHero hero={hero} />
        <section className="page-section academy-cards-section">
          <h2 className="section-title">Choose your path</h2>
          <div className="academy-cards">
            {cards.map((card, index) => (
              <article key={card.tag} id={card.id} className={`academy-card ${LOOKS[index % LOOKS.length]}`}>
                <p className="academy-tag">{card.tag}</p>
                <h3>{card.headline}</h3>
                <p>{card.text}</p>
                {card.details && (
                  <details>
                    <summary>
                      What you&rsquo;ll learn <Icon name="arrow-right-02" />
                    </summary>
                    {card.details.curriculum && (
                      <>
                        <h4>The curriculum</h4>
                        <p>{card.details.curriculum}</p>
                      </>
                    )}
                    {card.details.learn && (
                      <>
                        <h4>What you will learn</h4>
                        <p>{card.details.learn}</p>
                      </>
                    )}
                    {card.details.careers && (
                      <>
                        <h4>Career paths</h4>
                        <ul>
                          {card.details.careers.map((career) => (
                            <li key={career}>{career}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </details>
                )}
              </article>
            ))}
          </div>
        </section>
        <section className="apply-band academies-cta">
          <h2>
            <HeadingText heading={cta.title} />
          </h2>
          <ButtonLink link={cta.link} variant="primary" icon="arrow-right-02" />
        </section>
      </main>
      <Footer settings={settings} />
    </>
  );
}

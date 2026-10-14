import type { Metadata } from 'next';
import { Footer } from '@/components/Footer';
import { Icon } from '@/components/Icon';
import { HeadingText } from '@/components/Lines';
import { PageHero } from '@/components/PageHero';
import { getAboutPage, getSiteSettings } from '@/content';

export const metadata: Metadata = { title: 'About' };

export default async function AboutPage() {
  const [{ hero, initiative, founder, team }, settings] = await Promise.all([getAboutPage(), getSiteSettings()]);
  return (
    <>
      <main>
        <PageHero hero={hero} />
        <section className="page-section split-content">
          <div>
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
            <h2>
              <HeadingText heading={founder.title} />
            </h2>
            {founder.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>
        <section className="page-section team-section">
          <div className="team-intro">
            <h2>
              <HeadingText heading={team.title} />
            </h2>
            <p>{team.text}</p>
          </div>
          <div className="team-grid">
            {team.members.map((member, index) => (
              <article key={index} className="team-card">
                {member.image ? (
                  <img src={member.image.src} alt={member.image.alt} />
                ) : (
                  <div className="team-headshot" aria-hidden="true">
                    <Icon name="user" />
                  </div>
                )}
                <div>
                  <h3>{member.name}</h3>
                  <span>{member.role}</span>
                  <p>{member.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer settings={settings} />
    </>
  );
}

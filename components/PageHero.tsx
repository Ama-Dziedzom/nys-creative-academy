import type { PageHero as PageHeroContent } from '@/content';
import { HeadingText } from './Lines';

export function PageHero({ hero }: { hero: PageHeroContent }) {
  return (
    <section className="page-hero">
      <h1>
        <HeadingText heading={hero.title} />
      </h1>
      <p>{hero.text}</p>
    </section>
  );
}

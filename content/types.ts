/**
 * Content shapes for the site. These are the contract a CMS must fulfil:
 * when a CMS is chosen, map its documents onto these types in content/index.ts
 * and no page or component needs to change.
 */

/** A heading with optional line breaks (\n) and an emphasised (italic, accent) ending. */
export type Heading = { lead: string; emphasis?: string };

export type Link = { label: string; href: string };

export type Image = { src: string; alt: string };

export type SiteSettings = {
  name: string;
  location: string;
  copyright: string;
  nav: Link[];
  supportLink: Link;
};

export type AcademySlug = 'creative' | 'marketing' | 'ai';

export type Track = { name: string; description?: string };

export type Academy = {
  slug: AcademySlug;
  /** Name used in the application form. */
  name: string;
  /** Eyebrow on the Academies page, e.g. "01 / The Creative Academy". */
  label: string;
  title: string;
  description: string;
  /** Tracks offered; shown as cards on the Academies page when they have descriptions. */
  tracks: Track[];
};

export type HomePage = {
  hero: {
    eyebrow: string;
    title: Heading;
    text: string;
    primaryCta: Link;
    secondaryCta: Link;
    proof: [string, string];
    image: Image;
    imageLabel: string;
  };
  mission: { number: string; eyebrow: string; title: Heading; text: string };
  paths: {
    eyebrow: string;
    title: Heading;
    link: Link;
    items: { academy: AcademySlug; label: string; title: Heading; summary: string }[];
  };
  applyBand: { eyebrow: string; title: Heading; cta: Link };
  supportBand: { eyebrow: string; title: Heading; text: string; cta: Link; note?: string };
};

export type PageHero = { eyebrow: string; title: Heading; text: string };

export type AboutPage = {
  hero: PageHero;
  initiative: { eyebrow: string; title: Heading; paragraphs: string[] };
  founder: { role: string; name: string; image: Image; eyebrow: string; title: Heading; text: string };
};

export type AcademiesPage = { hero: PageHero; cta: Link };

export type ApplyPage = {
  eyebrow: string;
  title: Heading;
  intro: string;
  motivationLabel: string;
  motivationPlaceholder: string;
  submitLabel: string;
  successMessage: string;
};

export type SupportPage = {
  hero: PageHero;
  eyebrow: string;
  title: string;
  options: { title: string; text: string }[];
  cta: Link;
};

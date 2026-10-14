/**
 * Content shapes for the site. These are the contract a CMS must fulfil:
 * when a CMS is chosen, map its documents onto these types in content/index.ts
 * and no page or component needs to change.
 */

/** A heading with optional line breaks (\n) and an emphasised (italic, accent) ending. */
export type Heading = { lead: string; emphasis?: string };

export type Link = { label: string; href: string };

export type Image = { src: string; alt: string; credit?: string };

export type SiteSettings = {
  name: string;
  location: string;
  copyright: string;
  nav: Link[];
  supportLink: Link;
  footer: Footer;
};

export type Footer = {
  tagline: string;
  /** Call-to-action card at the top of the footer; its photos sit on the rings beside it. */
  cta: { eyebrow: string; title: Heading; text: string; link: Link; images: Image[] };
  columns: { title: string; links: Link[] }[];
  newsletter: { title: string; text: string; placeholder: string; successMessage: string };
  /** Social profiles, shown as icons in the bottom bar. `icon` is a Hugeicons name, e.g. "instagram". */
  socials: (Link & { icon: string })[];
};

export type AcademySlug = 'creative' | 'marketing' | 'ai';

export type Track = {
  name: string;
  /** Opening line, shown as the card heading. */
  headline?: string;
  description?: string;
  /** What you will learn, as one sentence. */
  learn?: string;
  careers?: string[];
};

export type Academy = {
  slug: AcademySlug;
  /** Name used in the application form. */
  name: string;
  /** Tag on the Academies page card, e.g. "The Creative Academy". */
  title: string;
  /** Opening line, shown as the card heading. */
  headline: string;
  description: string;
  /** Academies without sub-programmes describe their curriculum, learning and careers directly. */
  curriculum?: string;
  learn?: string;
  careers?: string[];
  /** Tracks offered in the application form; each gets its own card on the Academies page when it has a description. */
  tracks: Track[];
};

export type HomePage = {
  hero: {
    title: Heading;
    text: string;
    primaryCta: Link;
    secondaryCta: Link;
    /** Shown as a curved strip; works best with five images, the middle one being the strongest. */
    gallery: Image[];
  };
  mission: { title: Heading; text: string };
  paths: {
    eyebrow: string;
    title: Heading;
    link: Link;
    items: { academy: AcademySlug; label: string; title: Heading; summary: string }[];
  };
  applyBand: { eyebrow: string; title: Heading; cta: Link };
};

export type PageHero = { title: Heading; text: string };

export type AboutPage = {
  hero: PageHero;
  initiative: { title: Heading; paragraphs: string[] };
  founder: { role: string; name: string; image: Image; title: Heading; paragraphs: string[] };
  team: { title: Heading; text: string; members: TeamMember[] };
};

/** A team member card. Without an image, a headshot placeholder is shown. */
export type TeamMember = { name: string; role: string; bio: string; image?: Image };

export type AcademiesPage = { hero: PageHero; cta: { title: Heading; link: Link } };

export type ApplyPage = {
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

import type { AboutPage, Academy, AcademiesPage, ApplyPage, HomePage, SiteSettings, SupportPage } from './types';

/**
 * Local content used until a CMS is connected. Everything an editor might
 * change lives here; components only render what they are given.
 */

export const siteSettings: SiteSettings = {
  name: 'NYS Creative Academy',
  location: 'Abotakyi, Akuapem · Ghana',
  copyright: '© 2026 NYS Creative Academy',
  nav: [
    { label: 'About us', href: '/about' },
    { label: 'Academies', href: '/academies' },
    { label: 'Apply now', href: '/apply' },
  ],
  supportLink: { label: 'Support the mission', href: '/support' },
};

export const academies: Academy[] = [
  {
    slug: 'creative',
    name: 'Creative Academy',
    label: '01 / The Creative Academy',
    title: 'Your vision, brought to life.',
    description: 'Master storytelling across three studios.',
    tracks: [
      { name: 'Photography & Filmmaking', description: 'Camera, lighting, directing and editing.' },
      { name: 'The Writing Lab', description: 'Creative writing, scripts and digital copy.' },
      { name: 'The Music Studio', description: 'Beat-making, recording, mixing and mastering.' },
    ],
  },
  {
    slug: 'marketing',
    name: 'Digital Marketing Academy',
    label: '02 / Digital Marketing Academy',
    title: 'Turn attention into impact.',
    description: 'Build brands and drive sales with social media, content, SEO and paid ads.',
    tracks: [{ name: 'Social Media Management' }, { name: 'Content Strategy' }, { name: 'Paid Advertising & SEO' }],
  },
  {
    slug: 'ai',
    name: 'AI Training',
    label: '03 / AI Training',
    title: "Create with what's next.",
    description: 'Learn prompt engineering, AI content creation, workflow automation and creative problem-solving.',
    tracks: [{ name: 'Prompt Engineering' }, { name: 'AI Content Creation' }, { name: 'Workflow Automation' }],
  },
];

export const homePage: HomePage = {
  hero: {
    eyebrow: 'NYS Creative Academy · Abotakyi, Akuapem',
    title: { lead: 'Shape your future.\n', emphasis: 'Create your legacy.' },
    text: 'Digital, creative and AI skills that help the youth of Abotakyi and Akuapem build sustainable careers.',
    primaryCta: { label: 'Apply to learn', href: '/apply' },
    secondaryCta: { label: 'Explore programmes', href: '/academies' },
    proof: ['Abotakyi, Akuapem', 'Built for bold beginnings'],
    image: {
      src: 'https://framerusercontent.com/images/mfEZuJOJ61y3XeF36jmCLq9DLso.jpg?height=1080&width=864',
      alt: 'Ghanaian artist Theresah Ankomah in her creative studio',
    },
    imageLabel: 'Make your\nown signal.',
  },
  mission: {
    number: '(01)',
    eyebrow: 'The mission',
    title: { lead: 'Talent is everywhere.\nOpportunity should be too.' },
    text: 'Founded by Nana Yaw Sakyi, Apesemakahene of Abotakyi Akuapem, NYS Creative Academy offers world-class, practical training in creative, digital and AI skills, so young people can build a sustainable income right here.',
  },
  paths: {
    eyebrow: 'Choose your path',
    title: { lead: 'Learn what moves you.' },
    link: { label: 'View all programmes', href: '/academies' },
    items: [
      { academy: 'creative', label: '01 / Creative Academy', title: { lead: 'Tell stories\nthat stay.' }, summary: 'Photography, film, writing and music. Turn your creative passion into a profession.' },
      { academy: 'marketing', label: '02 / Digital Marketing', title: { lead: 'Turn attention\ninto impact.' }, summary: 'Social media, content and branding. Grow businesses, or build your own agency.' },
      { academy: 'ai', label: '03 / AI Training', title: { lead: "Create with\nwhat's next." }, summary: 'Use AI for creative problem-solving, content and business innovation.' },
    ],
  },
  applyBand: {
    eyebrow: 'The next intake is calling',
    title: { lead: 'Your next chapter\nstarts ', emphasis: 'now.' },
    cta: { label: 'Start my application', href: '/apply' },
  },
  supportBand: {
    eyebrow: 'For partners and supporters',
    title: { lead: 'Be Part of the Change' },
    text: 'Whether you’re here to learn or to sponsor, there’s a place for you.',
    cta: { label: 'Donate Today', href: '/support' },
    note: 'Donations and payments are intentionally out of scope for Phase 1.',
  },
};

export const aboutPage: AboutPage = {
  hero: {
    eyebrow: 'About NYS',
    title: { lead: 'Built in Akuapem.\n', emphasis: 'Made for the world.' },
    text: 'Investing in the young, creative minds of Abotakyi and its neighbouring towns.',
  },
  initiative: {
    eyebrow: 'The initiative',
    title: { lead: "Empowering Akuapem's youth for the global stage." },
    paragraphs: [
      'Our vision is simple: grow the local economy of Abotakyi and Akuapem by investing in its greatest resource, the youth.',
      'Hands-on training in Digital Marketing, AI, Filmmaking, Writing and Music Production opens pathways to independent incomes.',
    ],
  },
  founder: {
    role: 'Founder',
    name: 'Nana Yaw Sakyi',
    image: { src: 'https://princeclausfund.nl/uploads/img_3547.jpg', alt: 'Founder portrait placeholder' },
    eyebrow: 'A legacy project',
    title: { lead: 'Leadership rooted in the future.' },
    text: "The Academy marks one year since Nana Yaw Sakyi's enstoolment as Apesemakahene of Abotakyi Akuapem. Instead of a traditional celebration, he invested the milestone in his people.",
  },
};

export const academiesPage: AcademiesPage = {
  hero: {
    eyebrow: 'Our academies',
    title: { lead: 'Master the skills\nof ', emphasis: 'tomorrow.' },
    text: 'Find the path that matches your passion.',
  },
  cta: { label: 'Apply for an academy', href: '/apply' },
};

export const applyPage: ApplyPage = {
  eyebrow: 'Apply to NYS',
  title: { lead: 'Ready to turn your passion into a ', emphasis: 'paycheck?' },
  intro: 'Tell us about yourself and the path you want to explore.',
  motivationLabel: 'Why does this programme matter to you?',
  motivationPlaceholder: 'Share your ambition, curiosity or next big idea.',
  submitLabel: 'Send my application',
  successMessage: 'Thank you — your Phase 1 application has been captured. We will be in touch with the next step.',
};

export const supportPage: SupportPage = {
  hero: {
    eyebrow: 'Support NYS',
    title: { lead: 'Help talent become\n', emphasis: 'lasting opportunity.' },
    text: "Local champion, corporate partner or global supporter: there's a role for you.",
  },
  eyebrow: 'Partner with purpose',
  title: 'There is more than one way to build the future.',
  options: [
    { title: 'Fund a cohort', text: 'Sponsor a full training experience for young people.' },
    { title: 'Share expertise', text: 'Bring your industry knowledge into an Academy session.' },
    { title: 'Build a partnership', text: "Align youth opportunity with your organisation's goals." },
  ],
  cta: { label: 'Start a conversation', href: 'mailto:hello@nyscreativeacademy.org' },
};

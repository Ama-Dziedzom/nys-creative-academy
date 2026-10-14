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
  footer: {
    tagline: 'Digital, creative and AI skills for the youth of Abotakyi and Akuapem.',
    cta: {
      eyebrow: 'For partners and supporters',
      title: { lead: 'Be part of the change' },
      text: 'Whether you’re here to learn or to sponsor, there’s a place for you.',
      link: { label: 'Donate today', href: '/support' },
      images: [
        { src: 'https://images.unsplash.com/photo-1622295023825-6e319464b810?w=160&q=75&auto=format&fit=crop', alt: '' },
        { src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=160&q=75&auto=format&fit=crop', alt: '' },
        { src: 'https://images.unsplash.com/photo-1655720348590-c739c860beed?w=160&q=75&auto=format&fit=crop', alt: '' },
        { src: 'https://images.unsplash.com/photo-1620829813573-7c9e1877706f?w=160&q=75&auto=format&fit=crop', alt: '' },
        { src: 'https://images.unsplash.com/photo-1694175271713-a6e2cc378980?w=160&q=75&auto=format&fit=crop', alt: '' },
      ],
    },
    columns: [
      {
        title: 'Explore',
        links: [
          { label: 'About us', href: '/about' },
          { label: 'Academies', href: '/academies' },
          { label: 'Apply now', href: '/apply' },
          { label: 'Support the mission', href: '/support' },
        ],
      },
      {
        title: 'Contact',
        links: [
          { label: 'hello@nyscreativeacademy.org', href: 'mailto:hello@nyscreativeacademy.org' },
          { label: 'Abotakyi, Akuapem, Ghana', href: 'https://maps.google.com/?q=Abotakyi,Akuapem,Ghana' },
        ],
      },
    ],
    newsletter: {
      title: 'Newsletter',
      text: 'Intake dates, news and stories from the Academy.',
      placeholder: 'Enter your email',
      successMessage: 'Thank you. You’re on the list.',
    },
    // Add the Academy's profiles here, e.g. { label: 'Instagram', href: 'https://instagram.com/…', icon: 'instagram' }.
    socials: [],
  },
};

export const academies: Academy[] = [
  {
    slug: 'creative',
    name: 'Creative Academy',
    title: 'The Creative Academy',
    headline: 'Your vision, brought to life.',
    description:
      'The Creative Academy is dedicated to the art of storytelling through visual, written, and audio mediums. Learn to create professional-grade content that captivates audiences and attracts clients.',
    tracks: [
      {
        name: 'Photography & Filmmaking',
        headline: 'Step behind the lens and learn how to capture the world.',
        description:
          'This hands-on program covers everything from the basics of camera operation and lighting to advanced post-production editing.',
        learn: 'Camera settings, portrait and commercial photography, video directing, lighting techniques, and video editing.',
        careers: ['Freelance Photographer/Videographer', 'Wedding Filmmaker', 'Content Creator', 'Commercial Director'],
      },
      {
        name: 'The Writing Lab',
        headline: 'Words have power—and value.',
        description:
          'The Writing Lab is for natural storytellers who want to turn their ideas into compelling scripts, articles, and marketing copy.',
        learn: 'Creative writing, screenwriting for film and YouTube, digital copywriting, and storytelling structures.',
        careers: ['Freelance Copywriter', 'Screenwriter', 'Blogger', 'Brand Storyteller'],
      },
      {
        name: 'The Music Studio',
        headline: 'Find your sound and learn the technical skills to produce it.',
        description:
          'Our Music Studio program trains the next generation of sound engineers, producers, and beatmakers.',
        learn: 'Beat-making, vocal recording, mixing, mastering, and the business of music distribution.',
        careers: ['Music Producer', 'Sound Engineer', 'Podcast Producer', 'Foley/Audio Technician'],
      },
    ],
  },
  {
    slug: 'marketing',
    name: 'Digital Marketing Academy',
    title: 'Digital Marketing Academy',
    headline: 'The world is online, and businesses need experts to help them stand out.',
    description:
      'Learn how to navigate the digital landscape, build brands, and drive sales using the latest online strategies.',
    curriculum:
      'This academy breaks down the algorithms and teaches you how to build a loyal online audience. You will learn how to manage social media for brands, run profitable online ad campaigns, and create digital strategies that get results.',
    learn: 'Social Media Management, Content Strategy, Search Engine Optimization (SEO), Paid Advertising (Facebook/Google Ads), and brand building.',
    careers: ['Social Media Manager', 'Digital Marketing Strategist', 'E-commerce Manager', 'Freelance Marketing Consultant'],
    tracks: [{ name: 'Social Media Management' }, { name: 'Content Strategy' }, { name: 'Paid Advertising & SEO' }],
  },
  {
    slug: 'ai',
    name: 'AI Training',
    title: 'AI Training: Creative Problem Solving',
    headline: 'Artificial Intelligence is changing the world.',
    description:
      "Don't just watch it happen—learn how to use it to your advantage. This forward-thinking track merges technology with creativity.",
    curriculum:
      'This is not just about coding; it’s about using AI as a tool to enhance your creativity and solve real-world business problems. Learn how to work alongside AI to speed up your workflow, generate new ideas, and offer cutting-edge services to clients.',
    learn:
      'Prompt engineering, using AI for content creation (text, image, and video generation), automating business workflows, and leveraging AI for creative problem-solving.',
    careers: ['AI Consultant', 'Prompt Engineer', 'Next-Gen Content Creator', 'Tech Entrepreneur'],
    tracks: [{ name: 'Prompt Engineering' }, { name: 'AI Content Creation' }, { name: 'Workflow Automation' }],
  },
];

export const homePage: HomePage = {
  hero: {
    title: { lead: 'Shape your future.\n', emphasis: 'Create your legacy.' },
    text: 'Digital, creative and AI skills that help the youth of Abotakyi and Akuapem build sustainable careers.',
    primaryCta: { label: 'Apply to learn', href: '/apply' },
    secondaryCta: { label: 'Explore programmes', href: '/academies' },
    // Free Unsplash-licensed photos; replace with the Academy's own photography when available.
    gallery: [
      { src: 'https://images.unsplash.com/photo-1622295023825-6e319464b810?w=720&q=75&auto=format&fit=crop', alt: 'A young man reading notes beside his laptop', credit: 'Emmanuel Ikwuegbu / Unsplash' },
      { src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=720&q=75&auto=format&fit=crop', alt: 'Two young professionals working together at a computer', credit: 'X / Unsplash' },
      { src: 'https://images.unsplash.com/photo-1655720348590-c739c860beed?w=720&q=75&auto=format&fit=crop', alt: 'A group of young people with laptops, laughing together outdoors', credit: 'Iwaria Inc. / Unsplash' },
      { src: 'https://images.unsplash.com/photo-1620829813573-7c9e1877706f?w=720&q=75&auto=format&fit=crop', alt: 'A young man focused on his laptop', credit: 'Kojo Kwarteng / Unsplash' },
      { src: 'https://images.unsplash.com/photo-1694175271713-a6e2cc378980?w=720&q=75&auto=format&fit=crop', alt: 'A young man holding an open laptop', credit: 'Seth Ebenezer Tetteh / Unsplash' },
    ],
  },
  mission: {
    title: { lead: 'Talent is everywhere.\nOpportunity should be too.' },
    text: 'Founded by Nana Yaw Sakyi, Apesemakahene of Abotakyi Akuapem, NYS Creative Academy offers world-class, practical training in creative, digital and AI skills, so young people can build a sustainable income right here.',
  },
  paths: {
    eyebrow: 'Choose your path',
    title: { lead: 'Learn what moves you.' },
    link: { label: 'View all programmes', href: '/academies' },
    items: [
      { academy: 'creative', label: 'Creative Academy', title: { lead: 'Tell stories\nthat stay.' }, summary: 'Photography, film, writing and music. Turn your creative passion into a profession.' },
      { academy: 'marketing', label: 'Digital Marketing', title: { lead: 'Turn attention\ninto impact.' }, summary: 'Social media, content and branding. Grow businesses, or build your own agency.' },
      { academy: 'ai', label: 'AI Training', title: { lead: "Create with\nwhat's next." }, summary: 'Use AI for creative problem-solving, content and business innovation.' },
    ],
  },
  applyBand: {
    eyebrow: 'The next intake is calling',
    title: { lead: 'Your next chapter\nstarts now.' },
    cta: { label: 'Start my application', href: '/apply' },
  },
};

export const aboutPage: AboutPage = {
  hero: {
    title: { lead: 'Built in Akuapem.\nMade for the world.' },
    text: 'Investing in the young, creative minds of Abotakyi and its neighbouring towns.',
  },
  initiative: {
    title: { lead: 'Empowering Akuapem’s youth for the global stage.' },
    paragraphs: [
      'The NYS Creative Academy was born out of a simple, powerful vision: to transform the local economy of Abotakyi and other towns in Akuapem by investing in our greatest resource—the youth.',
      'Traditional career paths are evolving. Today’s global economy rewards digital fluency, creative problem-solving, and technological innovation. The NYS Creative Academy bridges the gap between raw local talent and the global marketplace.',
      'By providing intensive, hands-on training in high-demand fields like Digital Marketing, AI, Filmmaking, Writing, and Music Production, we are not just teaching skills; we are building pathways to sustainable, independent incomes.',
    ],
  },
  founder: {
    role: 'Founder',
    name: 'Nana Yaw Sakyi',
    image: { src: 'https://princeclausfund.nl/uploads/img_3547.jpg', alt: 'Founder portrait placeholder' },
    title: { lead: 'Leadership rooted in the future: Nana Yaw Sakyi' },
    paragraphs: [
      'The NYS Creative Academy was established to mark the one-year anniversary of Nana Yaw Sakyi’s enstoolment as Apesemakahene of Abotakyi Akuapem. Rather than a traditional celebration, the Apesemakahene chose to invest this milestone into a legacy project that would directly impact the lives of his people.',
      'Recognizing that the strength of any community lies in the prosperity and innovation of its young people, he founded the Academy to ensure that the youth of Akuapem are not left behind in the digital age, but are instead positioned as leaders and creators within it.',
    ],
  },
  team: {
    title: { lead: 'Learn from the best.' },
    text: 'Our academies are led by a dedicated team of industry professionals, active creatives, and tech innovators who are passionate about giving back.',
    // Placeholders until the team is confirmed: replace each with a name, role, short bio and headshot.
    members: [
      { name: 'Team member', role: 'Creative Academy', bio: 'A short bio of one or two sentences goes here.' },
      { name: 'Team member', role: 'Creative Academy', bio: 'A short bio of one or two sentences goes here.' },
      { name: 'Team member', role: 'Digital Marketing', bio: 'A short bio of one or two sentences goes here.' },
      { name: 'Team member', role: 'AI Training', bio: 'A short bio of one or two sentences goes here.' },
      { name: 'Team member', role: 'Programme lead', bio: 'A short bio of one or two sentences goes here.' },
    ],
  },
};

export const academiesPage: AcademiesPage = {
  hero: {
    title: { lead: 'Master the skills\nof tomorrow.' },
    text: 'At The NYS Creative Academy, our curriculum is designed with one primary goal: to give you the practical skills needed to generate a sustainable income. Choose the path that matches your passion and start building your future today.',
  },
  cta: {
    title: { lead: 'Ready to turn your passion\ninto a paycheck?' },
    link: { label: 'Apply for an academy now', href: '/apply' },
  },
};

export const applyPage: ApplyPage = {
  title: { lead: 'Ready to turn your passion into a ', emphasis: 'paycheck?' },
  intro: 'Tell us about yourself and the path you want to explore.',
  motivationLabel: 'Why does this programme matter to you?',
  motivationPlaceholder: 'Share your ambition, curiosity or next big idea.',
  submitLabel: 'Send my application',
  successMessage: 'Thank you — your Phase 1 application has been captured. We will be in touch with the next step.',
};

export const supportPage: SupportPage = {
  hero: {
    title: { lead: 'Help talent become\nlasting opportunity.' },
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

import Link from 'next/link';
import type { CSSProperties } from 'react';
import type { Link as LinkContent, SiteSettings } from '@/content';
import { Brand } from './Brand';
import { ButtonLink } from './ButtonLink';
import { Icon } from './Icon';
import { HeadingText } from './Lines';
import { NewsletterForm } from './NewsletterForm';

// Where each photo sits on the rings: which ring, and the angle around it.
const ORBIT_SPOTS = [
  { ring: 3, angle: -118 },
  { ring: 2, angle: -62 },
  { ring: 3, angle: -8 },
  { ring: 2, angle: 152 },
  { ring: 2, angle: 48 },
];

function FooterLink({ link }: { link: LinkContent }) {
  const external = /^https?:/.test(link.href);
  if (link.href.startsWith('/')) return <Link href={link.href}>{link.label}</Link>;
  return (
    <a href={link.href} {...(external && { target: '_blank', rel: 'noreferrer' })}>
      {link.label}
      {external && <Icon name="arrow-up-right-01" />}
    </a>
  );
}

export function Footer({ settings, showCta = true }: { settings: SiteSettings; showCta?: boolean }) {
  const { footer } = settings;
  return (
    <footer className="site-footer">
      {showCta && (
        <section className="footer-cta">
          <div className="footer-cta-copy">
            <p className="eyebrow">{footer.cta.eyebrow}</p>
            <h2>
              <HeadingText heading={footer.cta.title} />
            </h2>
            <p>{footer.cta.text}</p>
            <ButtonLink link={footer.cta.link} variant="primary" icon="arrow-up-right-01" />
          </div>
          <div className="footer-orbit" aria-hidden="true">
            <span className="ring ring-1" />
            <span className="ring ring-2" />
            <span className="ring ring-3" />
            <span className="ring ring-4" />
            <span className="brand-mark">NYS</span>
            {footer.cta.images.slice(0, ORBIT_SPOTS.length).map((image, index) => (
              <img
                key={image.src}
                src={image.src}
                alt=""
                style={
                  {
                    '--ring': ORBIT_SPOTS[index].ring,
                    '--angle': `${ORBIT_SPOTS[index].angle}deg`,
                  } as CSSProperties
                }
              />
            ))}
          </div>
        </section>
      )}

      <div className="footer-main">
        <div className="footer-about">
          <Brand />
          <p>{footer.tagline}</p>
        </div>
        {footer.columns.map((column) => (
          <nav key={column.title} className="footer-column" aria-label={column.title}>
            <h3>{column.title}</h3>
            <ul>
              {column.links.map((link) => (
                <li key={link.href}>
                  <FooterLink link={link} />
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <div className="footer-newsletter">
          <h3>{footer.newsletter.title}</h3>
          <p>{footer.newsletter.text}</p>
          <NewsletterForm content={footer.newsletter} />
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          <span>{settings.copyright}</span>
          <span>All rights reserved</span>
        </p>
        {footer.socials.length > 0 && (
          <div className="footer-bottom-end">
            {footer.socials.map((social) => (
              <a key={social.href} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label}>
                <Icon name={social.icon} />
              </a>
            ))}
          </div>
        )}
      </div>
    </footer>
  );
}

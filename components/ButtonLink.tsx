import Link from 'next/link';
import type { Link as LinkContent } from '@/content';
import { Icon } from './Icon';

/** A .button link with a trailing arrow; external and mailto links use a plain anchor. */
export function ButtonLink({ link, variant, icon, className = '' }: {
  link: LinkContent;
  variant: 'primary' | 'quiet' | 'light';
  icon?: string;
  className?: string;
}) {
  const classes = `button button-${variant} ${className}`.trim();
  const children = (
    <>
      {link.label}
      {icon && (
        <>
          {' '}
          <span>
            <Icon name={icon} />
          </span>
        </>
      )}
    </>
  );
  return link.href.startsWith('/') ? (
    <Link href={link.href} className={classes}>{children}</Link>
  ) : (
    <a href={link.href} className={classes}>{children}</a>
  );
}

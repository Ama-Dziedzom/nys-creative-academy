'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  { href: '/admin', label: 'Overview', icon: 'dashboard-square-01' },
  { href: '/admin/applications', label: 'Applications', icon: 'license-draft' },
  { href: '/admin/subscribers', label: 'Subscribers', icon: 'mail-01' },
  { href: '/admin/admins', label: 'Admins', icon: 'user-group' },
];

export function AdminNav() {
  const pathname = usePathname();
  return (
    <nav className="admin-nav" aria-label="Admin">
      {LINKS.map((link) => {
        const active = link.href === '/admin' ? pathname === '/admin' : pathname.startsWith(link.href);
        return (
          <Link key={link.href} href={link.href} aria-current={active ? 'page' : undefined}>
            <i className={`hgi-stroke hgi-${link.icon}`} aria-hidden="true" />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

import type { ReactNode } from 'react';

/** Split-screen frame for sign-in and setup: the crest on a dark panel, the form beside it. */
export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <main className="auth-page">
      <aside className="auth-brand">
        <a className="auth-logo" href="/" aria-label="NYS Creative Academy home">
          <img src="/brand/crest-full.png" alt="" />
        </a>
        <div className="auth-pitch">
          <p className="auth-eyebrow">Admin console</p>
          <h2>
            Every application is a <em>future</em> in the making.
          </h2>
        </div>
        <p className="auth-legal">NYS Creative Academy · Abotakyi Akuapem</p>
      </aside>
      <section className="auth-panel">
        <div className="auth-card">{children}</div>
      </section>
    </main>
  );
}

import type { Metadata } from 'next';
import './(site)/styles.css';
import './(site)/site.css';

export const metadata: Metadata = { title: 'Page not found — NYS Creative Academy' };

// Shown for any URL that matches no page. It sits outside both layouts, so it loads the site styles itself.
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700&family=Playfair+Display:wght@600&display=swap"
        />
      </head>
      <body>
        <main className="page-hero not-found">
          <h1>This page doesn’t exist.</h1>
          <p>
            <a href="/">Go to the home page</a>
          </p>
        </main>
      </body>
    </html>
  );
}

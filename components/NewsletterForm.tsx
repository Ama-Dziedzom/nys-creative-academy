'use client';

import { useState, type FormEvent } from 'react';
import type { Footer } from '@/content';
import { Icon } from './Icon';

export function NewsletterForm({ content }: { content: Footer['newsletter'] }) {
  const [submitted, setSubmitted] = useState(false);

  // Phase 1 has no backend: signing up only confirms on screen.
  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
  };

  if (submitted) return <p className="newsletter-success" role="status">{content.successMessage}</p>;

  return (
    <form className="newsletter-form" onSubmit={onSubmit}>
      <Icon name="at" />
      <input required type="email" name="email" autoComplete="email" placeholder={content.placeholder} aria-label="Email address" />
      <button type="submit" aria-label="Sign up">
        <Icon name="arrow-right-02" />
      </button>
    </form>
  );
}

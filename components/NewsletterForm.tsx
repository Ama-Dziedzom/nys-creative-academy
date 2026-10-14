'use client';

import { useActionState } from 'react';
import type { Footer } from '@/content';
import { subscribe, type SubscribeState } from '@/lib/leads/actions';
import { Icon } from './Icon';

export function NewsletterForm({ content }: { content: Footer['newsletter'] }) {
  const [state, action, pending] = useActionState(subscribe, {} as SubscribeState);

  if (state.ok) return <p className="newsletter-success" role="status">{content.successMessage}</p>;

  return (
    <>
      <form className="newsletter-form" action={action}>
        <Icon name="at" />
        <input
          required
          type="email"
          name="email"
          autoComplete="email"
          placeholder={content.placeholder}
          aria-label="Email address"
          defaultValue={state.email}
          aria-invalid={state.message ? true : undefined}
        />
        <input className="trap" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <button type="submit" aria-label="Sign up" disabled={pending}>
          <Icon name="arrow-right-02" />
        </button>
      </form>
      {state.message && (
        <p className="newsletter-error" role="alert">
          {state.message}
        </p>
      )}
    </>
  );
}

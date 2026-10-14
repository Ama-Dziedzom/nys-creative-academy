'use client';

import { useActionState, useState } from 'react';
import type { Academy, ApplyPage } from '@/content';
import { submitApplication, type ApplicationFields, type ApplicationState } from '@/lib/leads/actions';
import { Icon } from './Icon';

export function ApplicationForm({ academies, content }: { academies: Academy[]; content: ApplyPage }) {
  const [state, action, pending] = useActionState(submitApplication, {} as ApplicationState);
  const [academySlug, setAcademySlug] = useState('');
  // After a failed submit, remount the form so every field starts from the answers that were sent back.
  const [handled, setHandled] = useState(state);
  const [attempt, setAttempt] = useState(0);
  if (state !== handled) {
    setHandled(state);
    setAttempt(attempt + 1);
    setAcademySlug(state.values?.academy ?? '');
  }
  const tracks = academies.find((academy) => academy.slug === academySlug)?.tracks ?? [];
  const value = (name: ApplicationFields) => state.values?.[name] ?? '';
  const error = (name: ApplicationFields) =>
    state.errors?.[name] && (
      <span className="field-error" id={`${name}-error`}>
        {state.errors[name]}
      </span>
    );
  const invalid = (name: ApplicationFields) =>
    state.errors?.[name] ? { 'aria-invalid': true, 'aria-describedby': `${name}-error` } : {};

  if (state.ok) {
    return (
      <p className="success-message application-success" role="status">
        {content.successMessage}
      </p>
    );
  }

  return (
    <form key={attempt} className="application-form" action={action} noValidate>
      <label>
        First name
        <input required name="firstName" autoComplete="given-name" defaultValue={value('firstName')} {...invalid('firstName')} />
        {error('firstName')}
      </label>
      <label>
        Last name
        <input required name="lastName" autoComplete="family-name" defaultValue={value('lastName')} {...invalid('lastName')} />
        {error('lastName')}
      </label>
      <label>
        Email address
        <input required type="email" name="email" autoComplete="email" defaultValue={value('email')} {...invalid('email')} />
        {error('email')}
      </label>
      <label>
        Phone number
        <input required type="tel" name="phone" autoComplete="tel" defaultValue={value('phone')} {...invalid('phone')} />
        {error('phone')}
      </label>
      <label className="full">
        Preferred academy
        <select
          required
          name="academy"
          defaultValue={value('academy')}
          onChange={(event) => setAcademySlug(event.target.value)}
          {...invalid('academy')}
        >
          <option value="">Choose an academy</option>
          {academies.map((academy) => (
            <option key={academy.slug} value={academy.slug}>
              {academy.name}
            </option>
          ))}
        </select>
        {error('academy')}
      </label>
      <label className="full">
        Preferred track
        {/* Remounts when the academy changes, so the track resets to the prompt. */}
        <select key={academySlug} required name="track" defaultValue={value('academy') === academySlug ? value('track') : ''} {...invalid('track')}>
          <option value="">{academySlug ? 'Choose your preferred track' : 'Choose an academy first'}</option>
          {tracks.map((track) => (
            <option key={track.name}>{track.name}</option>
          ))}
        </select>
        {error('track')}
      </label>
      <label className="full">
        {content.motivationLabel}
        <textarea name="motivation" placeholder={content.motivationPlaceholder} defaultValue={value('motivation')} {...invalid('motivation')} />
        {error('motivation')}
      </label>
      {/* Spam trap: hidden from people and screen readers. */}
      <input className="trap" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <button className="button button-primary" type="submit" disabled={pending}>
        {pending ? 'Sending…' : content.submitLabel}{' '}
        <span>
          <Icon name="arrow-right-02" />
        </span>
      </button>
      {state.message && (
        <p className="form-message" role="alert">
          {state.message}
        </p>
      )}
    </form>
  );
}

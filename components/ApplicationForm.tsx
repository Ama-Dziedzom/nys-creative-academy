'use client';

import { useState, type FormEvent } from 'react';
import type { Academy, ApplyPage } from '@/content';
import { Icon } from './Icon';

export function ApplicationForm({ academies, content }: { academies: Academy[]; content: ApplyPage }) {
  const [academySlug, setAcademySlug] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const tracks = academies.find((academy) => academy.slug === academySlug)?.tracks ?? [];

  // Phase 1 has no backend: submitting only confirms on screen.
  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <form className="application-form" onSubmit={onSubmit}>
      <label>
        First name
        <input required name="firstName" autoComplete="given-name" />
      </label>
      <label>
        Last name
        <input required name="lastName" autoComplete="family-name" />
      </label>
      <label>
        Email address
        <input required type="email" name="email" autoComplete="email" />
      </label>
      <label>
        Phone number
        <input required type="tel" name="phone" autoComplete="tel" />
      </label>
      <label className="full">
        Preferred academy
        <select required name="academy" value={academySlug} onChange={(event) => setAcademySlug(event.target.value)}>
          <option value="">Choose an academy</option>
          {academies.map((academy) => (
            <option key={academy.slug} value={academy.slug}>
              {academy.name}
            </option>
          ))}
        </select>
      </label>
      <label className="full">
        Preferred track
        <select key={academySlug} required name="track" defaultValue="">
          <option value="">{academySlug ? 'Choose your preferred track' : 'Choose an academy first'}</option>
          {tracks.map((track) => (
            <option key={track.name}>{track.name}</option>
          ))}
        </select>
      </label>
      <label className="full">
        {content.motivationLabel}
        <textarea name="motivation" placeholder={content.motivationPlaceholder} />
      </label>
      <button className="button button-primary" type="submit">
        {content.submitLabel}{' '}
        <span>
          <Icon name="arrow-right-02" />
        </span>
      </button>
      <p className="success-message" aria-live="polite">
        {submitted ? content.successMessage : ''}
      </p>
    </form>
  );
}

'use client';

import { useState, type InputHTMLAttributes, type ReactNode } from 'react';

/** A labelled input with a leading icon; password inputs get a show/hide toggle. */
export function AuthField({
  label,
  hint,
  icon,
  type = 'text',
  ...input
}: { label: string; hint?: ReactNode; icon: string } & InputHTMLAttributes<HTMLInputElement>) {
  const [visible, setVisible] = useState(false);
  const isPassword = type === 'password';
  return (
    <label className="auth-field">
      <span className="auth-label">
        {label}
        {hint && <small>{hint}</small>}
      </span>
      <span className="auth-input">
        <i className={`hgi-stroke hgi-${icon}`} aria-hidden="true" />
        <input type={isPassword && visible ? 'text' : type} {...input} />
        {isPassword && (
          <button
            type="button"
            className="auth-reveal"
            onClick={() => setVisible(!visible)}
            aria-label={visible ? 'Hide password' : 'Show password'}
            aria-pressed={visible}
          >
            <i className={`hgi-stroke hgi-${visible ? 'view-off-slash' : 'view'}`} aria-hidden="true" />
          </button>
        )}
      </span>
    </label>
  );
}

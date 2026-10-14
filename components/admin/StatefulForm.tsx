'use client';

import { useActionState, useState, type ReactNode } from 'react';

type State = { message?: string; ok?: boolean };

/** A form bound to a server action that reports back a message, with a pending state on its button. */
export function StatefulForm({
  action,
  submitLabel,
  children,
  className = 'admin-form',
}: {
  action: (state: State, formData: FormData) => Promise<State>;
  submitLabel: string;
  children: ReactNode;
  className?: string;
}) {
  const [state, formAction, pending] = useActionState(action, {});
  // React resets a form after its action, but dropdowns fall back to their first option rather than the
  // saved value. Remounting after each result makes every field show the latest saved values instead.
  const [handled, setHandled] = useState(state);
  const [round, setRound] = useState(0);
  if (state !== handled) {
    setHandled(state);
    setRound(round + 1);
  }
  return (
    <form key={round} action={formAction} className={className}>
      {children}
      <div className="form-foot">
        <button className="admin-button" type="submit" disabled={pending}>
          {pending ? 'Working…' : submitLabel}
        </button>
        {state.message && (
          <p className={state.ok ? 'form-note ok' : 'form-note error'} role={state.ok ? 'status' : 'alert'}>
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}

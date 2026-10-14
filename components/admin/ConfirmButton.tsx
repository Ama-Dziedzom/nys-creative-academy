'use client';

import type { ReactNode } from 'react';

/** A submit button that asks before going ahead, for deletions. */
export function ConfirmButton({ message, children, ...props }: { message: string; children: ReactNode } & React.ComponentProps<'button'>) {
  return (
    <button
      type="submit"
      {...props}
      onClick={(event) => {
        if (!window.confirm(message)) event.preventDefault();
      }}
    >
      {children}
    </button>
  );
}

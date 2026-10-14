/** A Hugeicons (free, stroke rounded) icon; the font is loaded in app/layout.tsx. */
export function Icon({ name }: { name: string }) {
  return <i className={`hgi-stroke hgi-${name}`} aria-hidden="true" />;
}

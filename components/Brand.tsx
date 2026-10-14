import Link from 'next/link';

export function Brand() {
  return (
    <Link className="brand" href="/" aria-label="NYS Creative Academy home">
      <span className="brand-mark">NYS</span>
      <span>
        Creative
        <br />
        Academy
      </span>
    </Link>
  );
}

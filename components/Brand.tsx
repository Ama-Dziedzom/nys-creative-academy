import Image from 'next/image';
import Link from 'next/link';

export function Brand() {
  return (
    <Link className="brand" href="/" aria-label="NYS Creative Academy home">
      <Image className="brand-logo" src="/brand/crest-full.png" alt="" width={600} height={587} priority />
    </Link>
  );
}

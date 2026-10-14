import { Fragment } from 'react';
import type { Heading } from '@/content';

/** Renders text, turning each \n into a line break. */
export function Lines({ text }: { text: string }) {
  return text.split('\n').map((line, index) => (
    <Fragment key={index}>
      {index > 0 && <br />}
      {line}
    </Fragment>
  ));
}

/** Renders a CMS heading: the lead text followed by its emphasised ending. */
export function HeadingText({ heading }: { heading: Heading }) {
  return (
    <>
      <Lines text={heading.lead} />
      {heading.emphasis && <em>{heading.emphasis}</em>}
    </>
  );
}

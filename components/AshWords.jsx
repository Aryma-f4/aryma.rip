import { Fragment } from 'react';

// Server-rendered words preserve spaces, semantics, and the existing emphasis.
export default function AshWords({ text }) {
  const words=text.split(' ');
  return words.map((word,index)=><Fragment key={index}><span className="ash-word">{word}</span>{index<words.length-1?' ':null}</Fragment>);
}

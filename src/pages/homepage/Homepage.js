import React from "react";
import { InsetText, LeadParagraph } from 'govuk-react'
import * as copy from './copy';

const { heading, leadParagraph, insetText } = copy.default;

function Homepage() {
  return (
    <>
      <h2>{heading}</h2>
      <LeadParagraph>{leadParagraph}</LeadParagraph>
      <InsetText>{insetText}</InsetText>
    </>
  );
}

export { Homepage };

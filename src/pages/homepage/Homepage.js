import React from "react";
import { InsetText, LeadParagraph } from 'govuk-react'
import * as copy from './copy';
import { Link } from "react-router-dom";
import { DefaultLayout } from '../../layouts/DefaultLayout';

const { heading, leadParagraph, insetText, firstParagraph, secondParagraph, subjectHeading, subjectLinkText } = copy.default;

function Homepage() {
  return (
    <DefaultLayout heading={heading}>
      <LeadParagraph>{leadParagraph}</LeadParagraph>
      <InsetText>{insetText}</InsetText>
      <p>{firstParagraph}</p>
      <p>{secondParagraph}</p>
      <div>
        {/* TODO: remove data test ids */}
        <h3>{subjectHeading}</h3>
        <Link data-testid="my-details-link" to="/my-details">{subjectLinkText}</Link>
      </div>
    </DefaultLayout>
  );
}

export { Homepage };

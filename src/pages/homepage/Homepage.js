import React from "react";
import { InsetText, LeadParagraph } from 'govuk-react'
import * as copy from './copy';
import { Link } from "react-router-dom";
import { DefaultLayout } from '../../layouts/DefaultLayout';

const { heading, leadParagraph, insetText } = copy.default;

function Homepage() {
  return (
    <DefaultLayout heading={heading}>
      <LeadParagraph>{leadParagraph}</LeadParagraph>
      <InsetText>{insetText}</InsetText>
      <p>Once you've completed each section below you will be given the chance to review your responses before submitting them</p>
      <p>You will be asked basic information about yourself and your parents. You can review and amend your answers before submitting them.</p>
      <div>
        {/* TODO: remove data test ids */}
        <h3>Your details:</h3>
        <Link data-testid="my-details-link" to="/my-details">Your details page</Link>
      </div>
    </DefaultLayout>
  );
}

export { Homepage };

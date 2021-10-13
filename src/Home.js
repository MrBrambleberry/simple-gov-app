import React from "react";
import { Page, Footer, InsetText, LeadParagraph } from 'govuk-react'
import './index.css'

function Home() {
  return (
    <Page>
      <LeadParagraph>
        <h3>
          Welcome to your local (not very real) government service
        </h3>
        <p>Please complete every selection specified below</p>
        <p>You will be given the opportunity to review and edit them before submitting them</p>
      </LeadParagraph>
      <InsetText>
        Processing of your details can take upto 8 weeks
      </InsetText>

      <Footer />
    </Page>
  );
}

export default Home;

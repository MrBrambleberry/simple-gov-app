import { render, screen } from '@testing-library/react';
import { Homepage } from './Homepage';
import * as copy from './copy';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

describe('When rendering the homepage', () => {

  const renderPage = async () => render(
    <Router>
      <Switch>
        <Route path="/my-details">
          <>Mock my details page</>
        </Route>
        <Route exact path="/">
          <Homepage />
        </Route>
      </Switch>
    </Router>);

  it('shows the expected static content', async () => {
    const { heading, leadParagraph, insetText } = copy.default;

    await renderPage();

    [
      heading, leadParagraph, insetText
    ].forEach(content => {
      expect(screen.getByText(content)).toBeInTheDocument();
    });
  });

  it('goes to the my details page when I click on the my details link', async () => {
    await renderPage();

    await act(async () => {
      userEvent.click(screen.getByTestId('my-details-link'));
    });

    expect(screen.getByText('Mock my details page')).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import { Homepage } from './Homepage';
import * as copy from './copy';

describe('When rendering the homepage', () => {

  const renderPage = async () => render(<Homepage />);

  it('shows the expected static content', async () => {
    const { heading, leadParagraph, insetText } = copy.default;

    await renderPage();

    [
      heading, leadParagraph, insetText
    ].forEach(content => {
      expect(screen.getByText(content)).toBeInTheDocument();
    });
  })

});

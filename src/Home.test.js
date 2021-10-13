import { render, screen } from '@testing-library/react';
import Home from './Home';

test('renders learn react link', () => {
  render(<Home />);
  expect(screen.getByText("Welcome to your local (not very real) government service")).toBeInTheDocument();
});

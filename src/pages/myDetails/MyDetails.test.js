import { MyDetails } from './MyDetails'
import { render, screen } from '@testing-library/react';

describe('MyDetails', () => {
    const renderPage = async () => render(<MyDetails />);

    it('renders static content on the page', async () => {
        await renderPage();

        [
            'My Details'
        ].forEach(content => {
            expect(screen.getByText(content)).toBeInTheDocument();
        });
    })
})
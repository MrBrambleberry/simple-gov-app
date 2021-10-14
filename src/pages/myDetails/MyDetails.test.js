import { MyDetails } from './MyDetails'
import { render, screen } from '@testing-library/react';
import * as axios from 'axios';
import { act } from 'react-dom/test-utils';
import * as copy from './copy';

jest.mock('axios');

const {heading, legend, firstNameLabel, lastNameLabel, ageLabel} = copy.default;

const mockSubject = {
    subject: { firstName: "John", lastName: "Doe", age: 26}
};
const mockFetchSubject = results => {
    axios.get.mockImplementation(() => Promise.resolve({
        data: results
    }));
}

describe('MyDetails', () => {
    const renderPage = async () => render(<MyDetails />);

    it('renders static content on the page', async () => {
        await renderPage();

        [
            heading,
            legend
        ].forEach(content => {
            expect(screen.getByText(content)).toBeInTheDocument();
        });
    });

    it('Prepopulates input fields with data if we already have subject data',async ()=>{
        mockFetchSubject(mockSubject);
        
        await act(async () => {
            await renderPage();
        });
        
        expect(screen.getByLabelText(firstNameLabel)).toHaveValue('John');
        expect(screen.getByLabelText(lastNameLabel)).toHaveValue('Doe');
        expect(screen.getByLabelText(ageLabel)).toHaveValue('26');
    });
})
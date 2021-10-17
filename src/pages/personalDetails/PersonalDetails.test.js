import { PersonalDetails } from './PersonalDetails'
import { render, screen } from '@testing-library/react';
import * as axios from 'axios';
import { act } from 'react-dom/test-utils';
import * as copy from './copy';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

jest.mock('axios');

const { heading, legend, firstNameLabel, lastNameLabel, ageLabel } = copy.default;

const mockSubject = { firstName: "John", lastName: "Doe", age: 26 };
const mockFetchSubject = results => {
    axios.get.mockImplementation(() => Promise.resolve({
        data: results
    }));
}

const renderPage = async () => render(
    <Router>
        <Switch>
            <Route path="/">
                <PersonalDetails />
            </Route>
        </Switch>
    </Router>);

describe('PersonalDetails', () => {
    it('renders static content on the page', async () => {
        await renderPage();

        [
            heading,
            legend
        ].forEach(content => {
            expect(screen.getByText(content)).toBeInTheDocument();
        });
    });

    it('Prepopulates input fields with data if we already have subject data', async () => {
        mockFetchSubject(mockSubject);

        await act(async () => {
            await renderPage();
        });

        expect(screen.getByLabelText(firstNameLabel)).toHaveValue('John');
        expect(screen.getByLabelText(lastNameLabel)).toHaveValue('Doe');
        expect(screen.getByLabelText(ageLabel)).toHaveValue('26');
    });

    it('Posts data to our local service when we submit the form', async () => {
        await act(async () => {
            await renderPage();
        });

        await act(async () => {
            userEvent.type(screen.getByLabelText(firstNameLabel), 'Francesca');
            userEvent.type(screen.getByLabelText(lastNameLabel), 'Medina');
            userEvent.type(screen.getByLabelText(ageLabel), '38');
        });

        await act(async () => {
            userEvent.click(screen.getByTestId('submit-button'));
        });

        expect(axios.post).toBeCalledWith('http://localhost:3004/subject', {
            firstName: 'Francesca',
            lastName: 'Medina',
            age: '38'
        });
    });

    it('Shows error messages and does not submit the data if the data input is invalid', async () => {
        await act(async () => {
            await renderPage();
        });

        await act(async () => {
            userEvent.type(screen.getByLabelText(firstNameLabel), '123');
            userEvent.type(screen.getByLabelText(lastNameLabel), '456');
            userEvent.type(screen.getByLabelText(ageLabel), 'not a number');
        });

        await act(async () => {
            userEvent.click(screen.getByTestId('submit-button'));
        });

        [
            copy.errors.firstName.invalid,
            copy.errors.lastName.invalid,
            copy.errors.age.invalid
        ].forEach(content => {
            expect(screen.getAllByText(content).length).toBe(2);
        })

        expect(axios.post).not.toBeCalled();
    });

    it('displays an appropriate error message if fields are left blank', async () => {
        await act(async () => {
            await renderPage();
        });

        await act(async () => {
            await userEvent.click(screen.getByTestId('submit-button'));
        });

        [
            copy.errors.firstName.blank,
            copy.errors.lastName.blank,
            copy.errors.age.blank
        ].forEach(content => {
            expect(screen.getAllByText(content).length).toBe(2);
        });

        expect(axios.post).not.toBeCalled();
    });
})
import React from 'react';
import { expect, it, jest } from '@jest/globals';
import * as copy from './copy';
import { PersonalDetails } from './PersonalDetails';
import { render, screen } from '@testing-library/react';
import * as axios from 'axios';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { Router, Switch, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';

const { heading, legend, firstNameLabel, lastNameLabel, ageLabel } =
  copy.default;

jest.mock('axios');

const MockHomePage = () => (
  <>
    <h1>Home page</h1>
  </>
);

const renderPage = () => {
  const history = createMemoryHistory();
  history.push('/my-details');
  render(
    <Router history={history}>
      <Switch>
        <Route exact path="/homepage">
          <MockHomePage />
        </Route>
        <Route path="/my-details">
          <PersonalDetails
            copy={copy}
            targetURL={'http://localhost:3004/subject'}
          />
        </Route>
      </Switch>
    </Router>
  );
};

describe('PersonalDetails', () => {
  it('renders static content on the page', async () => {
    await renderPage();
    [heading, legend].forEach((content) => {
      expect(screen.getByText(content)).toBeInTheDocument();
    });
  });

  it('Prepopulates input fields with data if we already have subject data', async () => {
    const prepopulatedData = { firstName: 'John', lastName: 'Doe', age: '26' };

    axios.get.mockImplementation(() =>
      Promise.resolve({
        data: prepopulatedData,
      })
    );

    await act(async () => {
      await renderPage();
    });

    const { firstName, lastName, age } = prepopulatedData;

    expect(screen.getByLabelText(firstNameLabel)).toHaveValue(firstName);
    expect(screen.getByLabelText(lastNameLabel)).toHaveValue(lastName);
    expect(screen.getByLabelText(ageLabel)).toHaveValue(age);
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
      userEvent.click(screen.getByText('Submit'));
    });

    expect(axios.post).toBeCalledWith('http://localhost:3004/subject', {
      firstName: 'Francesca',
      lastName: 'Medina',
      age: '38',
    });

    expect(screen.getByText('Home page')).toBeInTheDocument();
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
      userEvent.click(screen.getByText('Submit'));
    });

    const { firstName, lastName, age } = copy.errors;

    [firstName.invalid, lastName.invalid, age.invalid].forEach((content) => {
      expect(screen.getAllByText(content).length).toBe(2);
    });

    expect(axios.post).not.toBeCalled();
    expect(screen.queryByText('Home page')).not.toBeInTheDocument();
  });

  it('displays an appropriate error message if fields are left blank', async () => {
    await act(async () => {
      await renderPage();
    });

    await act(async () => {
      await userEvent.click(screen.getByText('Submit'));
    });

    const { firstName, lastName, age } = copy.errors;

    [firstName.blank, lastName.blank, age.blank].forEach((content) => {
      expect(screen.getAllByText(content).length).toBe(2);
    });

    expect(axios.post).not.toBeCalled();
    expect(screen.queryByText('Home page')).not.toBeInTheDocument();
  });
});

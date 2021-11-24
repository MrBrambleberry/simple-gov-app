import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Fieldset } from 'govuk-react';
import { FormInput } from '../../components/FormInput';
import { useHistory } from 'react-router-dom';
import { DefaultLayout } from '../../layouts/DefaultLayout';

function PersonalDetails(props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [firstNameErrorText, setFirstNameErrorText] = useState('');
  const [lastNameErrorText, setLastNameErrorText] = useState('');
  const [ageErrorText, setAgeErrorText] = useState('');
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  const { copy, targetURL } = props;
  const {
    heading,
    legend,
    firstNameLabel,
    lastNameLabel,
    ageLabel,
    errors: pageErrors,
  } = copy.default;

  useEffect(() => {
    const getPersonalDetails = async () => {
      const res = await axios.get(targetURL);

      if (res) {
        const { firstName, lastName, age } = res.data;

        setFirstName(firstName);
        setLastName(lastName);
        setAge(age);
      }
    };

    getPersonalDetails();
  }, []);

  const findElementIndexByFieldname = (fieldName) =>
    errors.indexOf(errors.find((error) => error.targetName === fieldName));

  const removeError = (fieldName) => {
    const itemIndex = findElementIndexByFieldname(fieldName);
    if (itemIndex > -1) {
      errors.splice(itemIndex, 1);
    }
  };

  const addError = (errorText, fieldName) => {
    removeError(fieldName);
    errors.push({ targetName: fieldName, text: errorText });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (firstName === undefined || firstName === '') {
      setFirstNameErrorText(pageErrors.firstName.blank);
      addError(pageErrors.firstName.blank, 'firstName');
    } else if (firstName.match('[^a-zA-Z]') !== null) {
      setFirstNameErrorText(pageErrors.firstName.invalid);
      addError(pageErrors.firstName.invalid, 'firstName');
    } else {
      setFirstNameErrorText('');
      removeError('firstName');
    }

    if (lastName === undefined || lastName === '') {
      setLastNameErrorText(pageErrors.lastName.blank);
      addError(pageErrors.lastName.blank, 'lastName');
    } else if (lastName.match('[^a-zA-Z]') !== null) {
      setLastNameErrorText(pageErrors.lastName.invalid);
      addError(pageErrors.lastName.invalid, 'lastName');
    } else {
      setLastNameErrorText('');
      removeError('lastName');
    }

    if (age === undefined || age === '') {
      setAgeErrorText(pageErrors.age.blank);
      addError(pageErrors.age.blank, 'age');
    } else if (age.match('[^0-9]') !== null) {
      setAgeErrorText(pageErrors.age.invalid);
      addError(pageErrors.age.invalid, 'age');
    } else {
      setAgeErrorText('');
      removeError('age');
    }

    if (errors.length === 0) {
      setFirstNameErrorText('');
      setLastNameErrorText('');
      setAgeErrorText('');
      setErrors([]);

      axios.post(targetURL, { firstName, lastName, age });
      history.push('/');
    }
  };

  return (
    <DefaultLayout heading={heading} errors={errors}>
      <form onSubmit={onSubmit}>
        <Fieldset>
          <Fieldset.Legend>{legend}</Fieldset.Legend>
          <FormInput
            label={firstNameLabel}
            name={'firstName'}
            defaultValue={firstName}
            errorText={firstNameErrorText}
            setter={setFirstName}
          />
          <FormInput
            label={lastNameLabel}
            name={'lastName'}
            defaultValue={lastName}
            errorText={lastNameErrorText}
            setter={setLastName}
          />
          <FormInput
            label={ageLabel}
            name={'age'}
            defaultValue={age}
            errorText={ageErrorText}
            setter={setAge}
          />
          <div className="form-group">
            <Input data-testid="submit-button" type="submit" />
          </div>
        </Fieldset>
      </form>
    </DefaultLayout>
  );
}

export { PersonalDetails };

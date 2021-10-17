import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Input, Fieldset } from 'govuk-react';
import * as copy from './copy';
import { FormInput } from '../../components/FormInput';
import { ErrorSummaryDisplay } from '../../components/ErrorSummaryDisplay';

const { heading, legend, firstNameLabel, lastNameLabel, ageLabel } = copy.default;

function MyDetails() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [firstNameErrorText, setFirstNameErrorText] = useState("");
    const [lastNameErrorText, setLastNameErrorText] = useState("");
    const [ageErrorText, setAgeErrorText] = useState("");
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const getSubjectDetails = async () => {
            const res = await axios.get(`http://localhost:3004/subject`);

            if (res) {
                const { firstName, lastName, age } = res.data;

                setFirstName(firstName);
                setLastName(lastName);
                setAge(age);
            }
        }

        getSubjectDetails();
    }, []);

    const isErrorKeyInArray = fieldName => errors.find(error => error.targetName === fieldName);

    const removeError = (fieldName, setter) => {
        if (isErrorKeyInArray(fieldName)) {
            setter('');
            setErrors(errors.filter(error => error.targetName !== fieldName));
        }
    }

    const addError = (setter, errorText, fieldName) => {
        setter(errorText);
        let index;

        for (let i = 0; i < errors.length; i++) {
            if (errors[i].targetName === fieldName) {
                index = i;
            }
        }

        if (index !== undefined) {
            errors.splice(index, 1);
        }

        errors.push({ targetName: fieldName, text: errorText })
    }

    const onSubmit = event => {
        event.preventDefault();

        if (firstName === undefined || firstName === '') {
            addError(setFirstNameErrorText, copy.errors.firstName.blank, 'firstName');
        } else if (firstName.match('[^a-zA-Z]') !== null) {
            addError(setFirstNameErrorText, copy.errors.firstName.invalid, 'firstName');
        } else {
            removeError('firstName', setFirstNameErrorText);
        }

        if (lastName === undefined || lastName === '') {
            addError(setLastNameErrorText, copy.errors.lastName.blank, 'lastName');
        } else if (lastName.match('[^a-zA-Z]') !== null) {
            addError(setLastNameErrorText, copy.errors.lastName.invalid, 'lastName');
        } else {
            removeError('lastName', setLastNameErrorText);
        }

        if (age === undefined || age === '') {
            addError(setAgeErrorText, copy.errors.age.blank, 'age');
        } else if (age.match('[^0-9]') !== null) {
            addError(setAgeErrorText, copy.errors.age.invalid, 'age');
        } else {
            removeError('age', setAgeErrorText);
        }

        if (errors.length === 0) {
            setFirstNameErrorText("");
            setLastNameErrorText("");
            setAgeErrorText("");
            setErrors([]);

            axios.post('http://localhost:3004/subject', {
                firstName, lastName, age
            });
        }
    }

    return (
        <div>
            <h1>{heading}</h1>
            <ErrorSummaryDisplay errors={errors} />

            <form onSubmit={onSubmit}>
                <Fieldset>
                    <Fieldset.Legend>{legend}</Fieldset.Legend>
                    <FormInput
                        label={firstNameLabel}
                        name={"firstName"}
                        defaultValue={firstName}
                        errorText={firstNameErrorText}
                        setter={setFirstName}
                    />
                    <FormInput
                        label={lastNameLabel}
                        name={"lastName"}
                        defaultValue={lastName}
                        errorText={lastNameErrorText}
                        setter={setLastName}
                    />
                    <FormInput
                        label={ageLabel}
                        name={"age"}
                        defaultValue={age}
                        errorText={ageErrorText}
                        setter={setAge}
                    />
                    <div className="form-group">
                        <Input data-testid="submit-button" type="submit" />
                    </div>
                </Fieldset>
            </form>
        </div>
    )
}

export { MyDetails }
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Input, Fieldset } from 'govuk-react';
import * as copy from './copy';
import { FormInput } from '../../components/FormInput';
import { ErrorSummaryDisplay } from '../../components/ErrorSummaryDisplay';
import { DefaultLayout } from '../../layouts/DefaultLayout';

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

    const findElementIndexByFieldname = fieldName => errors.indexOf(errors.find(error => error.targetName === fieldName));

    const removeError = (fieldName, setter) => {
        const itemIndex = findElementIndexByFieldname(fieldName);
        if (itemIndex > -1) {
            setter('');
            errors.splice(itemIndex, 1);
        }
    }

    const addError = (setter, errorText, fieldName) => {
        setter(errorText);
        const itemIndex = findElementIndexByFieldname(fieldName);

        if (itemIndex > -1) {
            errors.splice(itemIndex, 1);
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
        <DefaultLayout heading={heading}>
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
        </DefaultLayout>
    )
}

export { MyDetails }
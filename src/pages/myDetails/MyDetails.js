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


    const addError = (setter, errorText, fieldName) => {
        setter(errorText);
        errors.push({ targetName: fieldName, text: errorText });
    }

    const onSubmit = event => {
        event.preventDefault();
        let noErrors = true;

        if (firstName === undefined || firstName === '') {
            addError(setFirstNameErrorText, copy.errors.firstName.blank, 'firstName');
            noErrors = false;
        } else if (firstName.match('[^a-zA-Z]') !== null) {
            addError(setFirstNameErrorText, copy.errors.firstName.invalid, 'firstName');
            noErrors = false;
        }

        if (lastName === undefined || lastName === '') {
            addError(setLastNameErrorText, copy.errors.lastName.blank, 'lastName');
            noErrors = false;
        } else if (lastName.match('[^a-zA-Z]') !== null) {
            addError(setLastNameErrorText, copy.errors.lastName.invalid, 'lastName');
            noErrors = false;
        }

        if (age === undefined || age === '') {
            addError(setAgeErrorText, copy.errors.age.blank, 'age');
            noErrors = false;
        } else if (age.match('[^0-9]') !== null) {
            addError(setAgeErrorText, copy.errors.age.invalid, 'age');
            noErrors = false;
        }

        if (noErrors) {
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
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

    const onSubmit = event => {
        event.preventDefault();
        let noErrors = true;

        if (firstName.match('[^a-zA-Z]') !== null) {
            setFirstNameErrorText(copy.errors.firstName.invalid);
            errors.push({ targetName: 'firstName', text: copy.errors.firstName.invalid });
            noErrors = false;
        }

        if (lastName.match('[^a-zA-Z]') !== null) {
            setLastNameErrorText(copy.errors.lastName.invalid);
            errors.push({ targetName: 'lastName', text: copy.errors.lastName.invalid });
            noErrors = false;
        }

        if (age.match('[^0-9]') !== null) {
            setAgeErrorText(copy.errors.age.invalid);
            errors.push({ targetName: 'age', text: copy.errors.age.invalid });
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
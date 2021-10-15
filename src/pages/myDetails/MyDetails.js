import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Input, Fieldset } from 'govuk-react';
import * as copy from './copy';
import { FormInput } from '../../components/FormInput';

const { heading, legend, firstNameLabel, lastNameLabel, ageLabel } = copy.default;
const errors = [];

function MyDetails() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [firstNameErrorText, setFirstNameErrorText] = useState("");
    const [lastNameErrorText, setLastNameErrorText] = useState("");
    const [ageErrorText, setAgeErrorText] = useState("");

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
            errors.push(firstNameErrorText);
            noErrors = false;
        }

        if (lastName.match('[^a-zA-Z]') !== null) {
            setLastNameErrorText(copy.errors.lastName.invalid);
            errors.push(lastNameErrorText);
            noErrors = false;
        }

        if (age.match('[^0-9]') !== null) {
            setAgeErrorText(copy.errors.age.invalid);
            errors.push(ageErrorText);
            noErrors = false;
        }

        if (noErrors) {
            setFirstNameErrorText("");
            setLastNameErrorText("");
            setAgeErrorText("");


            axios.post('http://localhost:3004/subject', {
                firstName, lastName, age
            });
        }
    }

    return (
        <div>
            <h1>{heading}</h1>
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
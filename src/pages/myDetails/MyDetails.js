import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Label, LabelText, Input, Fieldset } from 'govuk-react'
import * as copy from './copy';

const {heading, legend, firstNameLabel, lastNameLabel, ageLabel} = copy.default;


function MyDetails() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");

    useEffect(() => {
        const getSubjectDetails = async () => {
            const res = await axios.get(`http://localhost:3004/subject`);
        
            if(res){
                const {firstName, lastName, age} = res.data;
            
                setFirstName(firstName);
                setLastName(lastName);
                setAge(age);
            }   
        }

        getSubjectDetails();
    }, []);


    const onSubmit = event =>{
        axios.post('http://localhost:3004/subject',{
            firstName,lastName,age
        })
        event.preventDefault();
    }
    
    return (
        <div>
            <h1>{heading}</h1>

            <form onSubmit={onSubmit}>
                <Fieldset>
                    <Fieldset.Legend>{legend}</Fieldset.Legend>
                    <div className="form-group">
                        <Label>
                            <LabelText>
                                {firstNameLabel}
                            </LabelText>
                            <Input name="firstName" defaultValue={firstName} onChange={e => setFirstName(e.target.value)} />
                        </Label>
                    </div>
                    <div className="form-group">
                        <Label>
                            <LabelText>
                                {lastNameLabel}
                            </LabelText>
                            <Input name="lastName" defaultValue={lastName} onChange={e => setLastName(e.target.value)} />
                        </Label>
                    </div>
                    <div className="form-group">
                        <Label>
                            <LabelText>
                                {ageLabel}
                            </LabelText>
                            <Input name="age" defaultValue={age} onChange={e => setAge(e.target.value)} />
                        </Label>
                    </div>
                    <div className="form-group">
                        <Input data-testid="submit-button" type="submit" />
                    </div>
                </Fieldset>
            </form>
        </div>
    )
}

export { MyDetails }
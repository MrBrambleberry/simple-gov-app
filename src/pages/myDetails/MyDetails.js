import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Label, LabelText, Input, Fieldset } from 'govuk-react'


function MyDetails() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");


    useEffect(() => {
        const getSubjectDetails = async () => {
            const res = await axios.get(`http://localhost:3004/subject`);
        
            if(res){
                const {firstName, lastName, age} =res.data.subject;
            
                setFirstName(firstName);
                setLastName(lastName);
                setAge(age);
            }   
        }

        getSubjectDetails();
    }, []);
    
    return (
        <div>
            <h1>Your Details</h1>

            <Fieldset>
                <Fieldset.Legend>Please enter your details</Fieldset.Legend>
                <div className="form-group">
                    <Label>
                        <LabelText>
                            First Name
                        </LabelText>
                        <Input name="firstName" defaultValue={firstName}/>
                    </Label>
                </div>

                <div className="form-group">
                    <Label>
                        <LabelText>
                            Last Name
                        </LabelText>
                        <Input name="lastName" defaultValue={lastName} />
                    </Label>
                </div>

                <div className="form-group">
                    <Label>
                        <LabelText>
                            Age
                        </LabelText>
                        <Input name="age" defaultValue={age} />
                    </Label>
                </div>

            </Fieldset>
        </div>
    )
}

export { MyDetails }
import { Label, LabelText, Input, Fieldset, DateField } from 'govuk-react'

function MyDetails() {
    return (
        <div>
            <h1>Your Details</h1>

            <Fieldset>
                <Fieldset.Legend>Please enter your details</Fieldset.Legend>
                <div class="form-group">
                    <Label>
                        <LabelText>
                            First Name
                        </LabelText>
                        <Input name="firstName" />
                    </Label>
                </div>

                <div class="form-group">
                    <Label>
                        <LabelText>
                            Last Name
                        </LabelText>
                        <Input name="lastName" />
                    </Label>
                </div>

                <div class="form-group">
                    <Label>
                        <LabelText>
                            Age
                        </LabelText>
                        <DateField name="dateOfBirth" hintText="For example, 31 03 1980">
                            What is your date of birth?
                        </DateField>
                    </Label>
                </div>

            </Fieldset>
        </div>
    )
}

export { MyDetails }
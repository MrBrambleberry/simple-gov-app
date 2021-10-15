import { Label, LabelText, Input, ErrorText } from 'govuk-react';

function FormInput(props) {
    const { label, name, defaultValue, setter, errorText } = props;

    return (
        <div className="form-group">
            <Label>
                <LabelText>
                    {label}
                </LabelText>
                {errorText && (<ErrorText>
                    {errorText}
                </ErrorText>)}
                <Input name={name} defaultValue={defaultValue} onChange={e => setter(e.target.value)} />
            </Label>
        </div>
    )
}

export { FormInput }
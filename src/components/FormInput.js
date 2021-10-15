import { Label, LabelText, Input } from 'govuk-react';

function FormInput(props){
    const {label, name, defaultValue, setter} = props;
    
    return(
        <div className="form-group">
            <Label>
                <LabelText>
                    {label}
                </LabelText>
                <Input name={name} defaultValue={defaultValue} onChange={e => setter(e.target.value)} />
            </Label>
        </div>
    )
}

export {FormInput}
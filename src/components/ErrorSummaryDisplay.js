import { ErrorSummary } from 'govuk-react';

function ErrorSummaryDisplay(props) {
    const { errors = [] } = props;

    return (
        errors.length > 0 && <ErrorSummary
            description="Please correct the errors and submit again"
            errors={errors}
            heading="Something went wrong"
        />
    )
}

export { ErrorSummaryDisplay }
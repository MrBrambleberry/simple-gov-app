import { Page, Footer } from 'govuk-react';
import { ErrorSummaryDisplay } from '../components/ErrorSummaryDisplay';

function DefaultLayout(props) {
    const { children, heading, errors } = props;

    return (
        <>
            <Page>
                <div className="wrapper">
                    <h2>{heading}</h2>
                    {errors && <ErrorSummaryDisplay errors={errors} />}
                    {children}
                </div>
            </Page>
            <Footer />
        </>
    );
}

export { DefaultLayout }
import { Page, Footer } from 'govuk-react'

function DefaultLayout(props) {
    const { children, heading } = props;

    return (
        <>
            <Page>
                <div className="wrapper">
                    <h2>{heading}</h2>
                    {children}
                </div>
            </Page>
            <Footer />
        </>
    );
}

export { DefaultLayout }
import { Page, Footer } from 'govuk-react'

function DefaultLayout(props) {
    const { children } = props;

    return (
        <>
            <Page>
                <div className="wrapper">
                    {children}
                </div>
            </Page>
            <Footer />
        </>
    );
}

export { DefaultLayout }
import { PersonalDetails } from './PersonalDetails'
import { Route, Switch } from "react-router-dom";

const SubjectDetails = () => <PersonalDetails />;
const PersonalDetailsRoutes = () => {
    return (
        <Switch>
            <Route path="/my-details">
                <SubjectDetails />
            </Route>
        </Switch>
    );
}

export { PersonalDetailsRoutes, SubjectDetails }
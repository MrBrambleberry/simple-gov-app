import { PersonalDetails } from './PersonalDetails'
import { Route, Switch } from "react-router-dom";
import * as subjectCopy from './copy';

const SubjectDetails = () => <PersonalDetails copy={subjectCopy} />;
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
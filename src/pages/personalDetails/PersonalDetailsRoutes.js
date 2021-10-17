import { PersonalDetails } from './PersonalDetails'
import { Route, Switch } from "react-router-dom";

const PersonalDetailsRoutes = () => {
    return (
        <Switch>
            <Route path="/my-details">
                <PersonalDetails />
            </Route>
        </Switch>
    );
}

export { PersonalDetailsRoutes }
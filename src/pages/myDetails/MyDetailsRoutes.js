import { MyDetails } from './MyDetails'
import {
    Route, Switch
} from "react-router-dom";

const MyDetailsRoutes = () => {
    return (
        <Switch>
            <Route path="/my-details">
                <MyDetails />
            </Route>
        </Switch>
    );
}

export { MyDetailsRoutes }
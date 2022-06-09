import React from 'react';
import ReactDOM from 'react-dom';
import { Homepage } from './pages/homepage/Homepage';
import { PersonalDetails } from './pages/personalDetails/PersonalDetails';
import './index.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import * as copy from './pages/personalDetails/copy';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/homepage">
          <Homepage />
        </Route>
        <Route path="/my-details">
          <PersonalDetails
            copy={copy}
            targetURL={'http://localhost:3004/subject'}
          />
        </Route>
        <Redirect to="/homepage" />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

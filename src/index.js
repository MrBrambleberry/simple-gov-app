import React from 'react';
import ReactDOM from 'react-dom';
import { Homepage } from './pages/homepage/Homepage';
import { PersonalDetailsRoutes } from './pages/personalDetails/PersonalDetailsRoutes';
import './index.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <PersonalDetailsRoutes />
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

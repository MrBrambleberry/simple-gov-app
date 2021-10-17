import React from 'react';
import ReactDOM from 'react-dom';
import { Homepage } from './pages/homepage/Homepage';
import { MyDetails } from './pages/myDetails/MyDetails';
import './index.css'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/my-details">
          <MyDetails />
        </Route>
        <Route exact path="/">
          <Homepage />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

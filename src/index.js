import React from 'react';
import ReactDOM from 'react-dom';
import { Homepage } from './pages/homepage/Homepage';
import { MyDetailsRoutes } from './pages/myDetails/MyDetailsRoutes';
import './index.css'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <MyDetailsRoutes />
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

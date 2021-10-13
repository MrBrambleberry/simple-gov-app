import React from 'react';
import ReactDOM from 'react-dom';
import { Homepage } from './pages/homepage/Homepage';
import { DefaultLayout } from './layouts/DefaultLayout';
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <DefaultLayout>
      <Homepage />
    </DefaultLayout>
  </React.StrictMode>,
  document.getElementById('root')
);

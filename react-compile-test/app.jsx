'use strict';
import React from 'react';
import { Router, browserHistory } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import routes from '../views/routes.js';
import reducers from '../views/reducers.js';

const store = createStore(reducers);

const Test = () => (
  <html>
  <head>
    <title>My Anime List</title>
  </head>
  <body>
    <Provider store = {store}>
      <Router history={browserHistory} routes={routes} />
    </Provider>
  </body>
  </html>
);

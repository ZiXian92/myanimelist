'use strict';
import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import reducers from '../views/reducers.js';
import routes from '../views/routes.js';

const initialState = window.__initialState__;

const store = createStore(reducers, initialState);

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
, document.getElementById('root'));

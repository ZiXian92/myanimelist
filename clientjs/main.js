'use strict';
import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import reducers from '../views/reducers.js';
import routes from '../views/routes.js';
import { get } from '../views/fetch-wrapper.js';
import { setUser } from '../views/user/user-actions.js';

const initialState = window.__initialState__;

const store = createStore(reducers, initialState);

get('/api/me').then(res => {
  if(res.status===200) res.json().then(user => store.dispatch(setUser(user)));
});

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
, document.getElementById('root'));

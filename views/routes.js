'use strict';
import App from './app.jsx';
import Home from './home.jsx';
import Login from './login.jsx';
import Error404 from './404.jsx';

const routes = [{
  path: '/',
  component: App,
  indexRoute: {
    component: Home
  },
  childRoutes: [{
    path: 'login',
    component: Login
  }, {
    path: '*',
    component: Error404
  }]
}];

export default routes;

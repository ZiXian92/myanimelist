'use strict';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import routes from '../views/routes.js';

export default function renderReactPage(req, res, getStore){
  match({ routes, location: req.originalUrl }, (error, redirectLocation, renderProps)=>{
    if(error) res.status(500).send(error.message);
    else if(redirectLocation) res.redirect(302, redirectLocation.pathname+redirectLocation.search);
    else if(!renderProps) res.status(404).send('Not Found');  // Won't happen. Just in case.
    else{
      getStore().then((store)=>{
        let initialState = store.getState();
        let html = renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        );

        res.send(`
          <!DOCTYPE html>
          <html>
          <head>
            <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width" />
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" />
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css"/>
            <title>My Anime List</title>
          </head>
          <body>
            <div id="root">${html}</div>
            <script>window.__initialState__ = ${JSON.stringify(initialState)};</script>
            <script src="/bundle.js"></script>
          </body>
          </html>
        `);
      });
    }
  });
}

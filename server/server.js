'use strict';
import express from 'express';
import bodyParser from 'body-parser';
import { createStore } from 'redux';
import reducers from '../views/reducers.js';
import renderReactPage from './renderer';
import db from './db.js';
import { initCheck } from './policies.js';
import { prepareStore } from './misc.js';
import ApiRouter from './api.js';
import { hash, compare } from 'bcrypt';
import UserModel from './user/model.js';

const PORT = 80;

const app = express();

app.use(express.static('./public'));
app.use((req, res, next) => {   // Spew out incoming requests for debugging purpose
  console.log(`${req.method} ${req.url}`);
  next();
});
app.get('/favicon.ico', (req, res) => res.sendStatus(404)); // Prevent request for favicon from triggering initCheck
app.use(initCheck);   // Check if app is initialized, redirect to /init if not initialized
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api', ApiRouter);  // Route for all API endpoints

// Initializing 1st admin user
// Implementation mostly the same as POST /api/user but that endpoint will be blocked
// by initCheck
app.post('/init', (req, res, next) => {
  let userData = req.body;
  if(!userData || !userData || !userData.password) res.sendStatus(400);
  userData.admin = 1;
  hash(userData.password, 10, (err, h) => {
    userData.password = h;
    UserModel.addUser(userData).then(result => res.sendStatus(200), err => res.sendStatus(500));
  });
});

app.post('/login', (req, res) => {
  // If user is logged in, reject with 403
  let userData = req.body;
  if(!userData || !userData || !userData.password) res.sendStatus(400);
  UserModel.getUserByName(userData.username).then(user => {
    compare(userData.password, user.password, (err, result) => {
      if(err) res.sendStatus(500);
      else if(!result) res.sendStatus(401);
      else{
        // Generate access and refresh tokens and send as payload.
        res.sendStatus(200);
      }
    });
  }).catch(err => {
    if(err.status===404) res.sendStatus(401);
    else res.sendStatus(500);
  });
});

// All GET requests that end up here are assumed to be page requests
app.get('*', (req, res)=>{
  renderReactPage(req, res, () => prepareStore(req));
});

app.listen(PORT, ()=>{
  console.log('Listening on port '+PORT);
});

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
import { hash } from 'bcrypt';
import UserModel from './user/model.js';

const PORT = 80;

const app = express();

app.use(express.static('./public'));
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
app.get('/favicon.ico', (req, res) => res.sendStatus(404));
app.use(initCheck);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api', ApiRouter);

app.post('/init', (req, res, next) => {
  let userData = req.body;
  userData.admin = 1;
  hash(userData.password, 10, (err, h) => {
    userData.password = h;
    UserModel.addUser(userData).then(result => res.sendStatus(200), err => res.sendStatus(500));
  });
});

app.get('*', (req, res)=>{
  renderReactPage(req, res, () => prepareStore(req));
});

app.listen(PORT, ()=>{
  console.log('Listening on port '+PORT);
});

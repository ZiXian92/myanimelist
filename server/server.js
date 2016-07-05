'use strict';
import express from 'express';
import bodyParser from 'body-parser';
import { createStore } from 'redux';
import reducers from '../views/reducers.js';
import renderReactPage from './renderer';
import db from './db.js';
import { initCheck } from './policies.js';
import { prepareStore } from './misc.js';

const PORT = 80;

const app = express();

app.use(express.static('./public'));
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
app.use(initCheck);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/init', (req, res) => {
  console.log(req.body);
  res.redirect('/');
});

app.get('*', (req, res)=>{
  renderReactPage(req, res, () => prepareStore(req));
});

app.listen(PORT, ()=>{
  console.log('Listening on port '+PORT);
});

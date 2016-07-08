'use strict';
import express from 'express';
import bodyParser from 'body-parser';
import renderReactPage from './helpers/renderer.js';
import { initCheck, requireLogin, requireAdmin } from './helpers/policies.js';
import { prepareStore } from './helpers/misc.js';
import ApiRouter from './api.js';
import UserModel from './user/model.js';
import { decodeJwt } from './helpers/jwt.js';
import { initHandler, loginHandler, refreshHandler } from './helpers/auth-handlers.js';

const PORT = 80;

const app = express();

app.use(express.static('./public'));
app.use((req, res, next) => {   // Spew out incoming requests for debugging purpose
  console.log(`${req.method} ${req.url}`);
  next();
});
app.get('/favicon.ico', (req, res) => res.sendStatus(404)); // Prevent request for favicon from triggering initCheck
app.use(initCheck);   // Check if app is initialized, redirect to /init if not initialized
app.use(decodeJwt);   // Prepare req.user if user is logged in
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api', ApiRouter);  // Route for all API endpoints

// Initializing 1st admin user
// Implementation mostly the same as POST /api/user but that endpoint will be blocked
// by initCheck
app.post('/init', initHandler);

app.post('/login', loginHandler);   // Process login requests
app.post('/refresh', requireLogin, refreshHandler);

// All GET requests that end up here are assumed to be page requests
app.get('*', (req, res)=>{
  renderReactPage(req, res, () => prepareStore(req));
});

app.listen(PORT, ()=>{
  console.log('Listening on port '+PORT);
});

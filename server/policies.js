'use strict';
import db from './db.js';

const isInitialized = db().then(conn => conn.collection('users').find().limit(1).toArray().then(users => users.length>0));
export function initCheck(req, res, next) {
  console.log('init check');
  isInitialized.then(ans => {
    if(!ans && req.originalUrl!=='/init')res.redirect('/init');
    else if(ans && req.originalUrl==='/init')res.redirect('/');
    else next();
  });
};

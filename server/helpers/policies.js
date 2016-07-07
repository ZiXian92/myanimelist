'use strict';
import db from './db.js';

const isInitialized = () => db().then(conn => conn.collection('users').find().limit(1).toArray().then(users => users.length>0));
export function initCheck(req, res, next) {
  isInitialized().then(ans => {
    if(!ans && req.originalUrl!=='/init')res.redirect('/init');
    else if(ans && req.originalUrl==='/init')res.redirect('/');
    else next();
  });
};

const noDataRoutes = ['/login', '/init'];
export function isNoDataRoute(url){
  return !!noDataRoutes.find(route => url.startsWith(route));
}

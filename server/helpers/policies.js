'use strict';
import db from './db.js';
import UserModel from '../user/model.js';

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

export function requireLogin(req, res, next){
  if(!req.user) return res.sendStatus(401);
  UserModel.getUserById(req.user._id).then(user => next()).catch(err => {
    console.log(err);
    if(err.status===404) return res.sendStatus(401);
    res.sendStatus(err.status);
  });
}

export function requireAdmin(req, res, next){
  if(!req.user) return res.sendStatus(401);;
  UserModel.getUserById(req.user._id).then(user => {
    if(!user.admin || user.admin!==req.user.admin) return res.sendStatus(403);
    next();
  }).catch(err => {
    console.log(err);
    if(err.status===404) return res.sendStatus(401);
    res.sendStatus(err.status);
  });
}

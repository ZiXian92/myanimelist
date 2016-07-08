'use strict';
import { compare, hash } from 'bcrypt';
import objectAssign from 'object-assign';
import UserModel from '../user/model.js';
import { generateAccessToken, generateRefreshToken } from './jwt.js';

export function initHandler(req, res) {
  let userData = req.body;
  if(!userData || !userData || !userData.password) res.sendStatus(400);
  userData.admin = 1;
  hash(userData.password, 10, (err, h) => {
    userData.password = h;
    UserModel.addUser(userData).then(result => res.sendStatus(200), err => res.sendStatus(500));
  });
}

export function loginHandler(req, res) {
  // If user is logged in, reject with 403
  if(req.user) return res.sendStatus(403);
  let userData = req.body;
  if(!userData || !userData || !userData.password) res.sendStatus(400);
  UserModel.getUserByName(userData.username).then(user => {
    compare(userData.password, user.password, (err, result) => {
      if(err) res.sendStatus(500);
      else if(!result) res.sendStatus(401);
      else{
        console.log(user);
        Promise.all([generateAccessToken(objectAssign({}, user, {refresh: false})),
        generateRefreshToken(objectAssign({}, user, {refresh: true}))]).then((tokens) => {
          res.json({
            'token_type': 'bearer',
            'access_token': tokens[0],
            'expires_in': 3600,
            'refresh_token': tokens[1]
          });
        }, err =>{ console.log(err); res.sendStatus(500); });
      }
    });
  }).catch(err => {
    if(err.status===404) res.sendStatus(401);
    else res.sendStatus(500);
  });
}

export function refreshHandler(req, res){
  if(!req.user || !req.user.refresh) return res.sendStatus(401);
  let user = {
    _id: req.user._id,
    username: req.user.username,
    password: req.user.password,
    admin: req.user.admin
  };
  Promise.all([generateAccessToken(objectAssign({}, user, {refresh: false})),
  generateRefreshToken(objectAssign({}, user, {refresh: true}))]).then((tokens) => {
    res.json({
      'token_type': 'bearer',
      'access_token': tokens[0],
      'expires_in': 3600,
      'refresh_token': tokens[1]
    });
  }, err =>{ console.log(err); res.sendStatus(500); });
}

'use strict';
import { sign, verify } from 'jsonwebtoken';
import * as fs from 'fs';

let secret = fs.readFileSync(__dirname+'/../../jwtkey', {encoding: 'utf-8'});

let accessTokenConfig = {
  expiresIn: '1h',
  issuer: 'myanimelist',
  audience: 'myanimelist',
  subject: 'Access token for myanimelist'
};

let refreshTokenConfig = {
  expiresIn: '7d',
  issuer: 'myanimelist',
  audience: 'myanimelist',
  subject: 'Refresh token for myanimelist'
};

let decodeOptions = {
  issuer: 'myanimelist',
  audience: 'myanimelist',
};

export function decodeJwt(req, res, next){
  let token = req.headers['authorization'];
  if(token) verify(token.replace('Bearer ', ''), secret, decodeOptions, (err, decoded) => {
    if(decoded) req.user = decoded;
    next();
  });
  else next();
}

export function generateAccessToken(payload){
  return new Promise((resolve, reject) => sign(payload, secret, accessTokenConfig, (err, token) => {
    if(err) return reject(err);
    return resolve(token);
  }));
}

export function generateRefreshToken(payload){
  return new Promise((resolve, reject) => sign(payload, secret, refreshTokenConfig, (err, token) => {
    if(err) return reject(err);
    return resolve(token);
  }));
}

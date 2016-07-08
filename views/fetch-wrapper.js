'use strict';
import fetch from 'isomorphic-fetch';
import objectAssign from 'object-assign';
import { md5 } from 'node_hash';
import localStorageConfig from '../local-storage-config.js';

const accessTokenKey = md5(localStorageConfig.accessKey);
const refreshTokenKey = md5(localStorageConfig.refreshKey);

let accessToken;
let refreshToken;

function initTokens(){
  accessToken = window.localStorage.getItem(accessTokenKey);
  refreshToken = window.localStorage.getItem(refreshTokenKey);
}

function updateTokens(tokens){
  accessToken = tokens.access_token;
  refreshToken = tokens.refresh_token;
  window.localStorage.setItem(accessTokenKey, accessToken);
  window.localStorage.setItem(refreshTokenKey, refreshToken);
}

function clearTokens(){
  accessToken = refreshToken = null;
  window.localStorage.removeItem(accessTokenKey);
  window.localStorage.removeItem(refreshTokenKey);
}

// Base function that automatically tries to use refresh token
// if access token expired
function ajax(url, options){
  if(!accessToken || !refreshToken) initTokens();
  if(accessToken){
    if(!options.headers) options.headers = {};
    options.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return fetch(url, options).then(res => {
    if(res.status===401 && refreshToken){ // Unauthorized, try using refresh token
      return fetch('/refresh', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${refreshToken}`
        }
      }).then(res2 => {
        if(res2.status===401){ // All tokens are invalid, clear them all
          clearTokens();
          return res;   // Since unauthorized, return original response.
        } else{ // Update the tokens
          res2.json().then(body => {
            updateTokens(body);
            options.headers['Authorization'] = `Bearer ${accessToken}`;
            return fetch(url, options);   // Try one more time with new access token
          });
        }
      });
    } else return res;
  });
}

export function get(url, headers){
  return ajax(url, {
    method: 'GET',
    headers
  });
}

export function login(loginData){
  return ajax('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginData)
  }).then(res => {
    if(res.status===200){ // Login successful
      return res.json().then(body => {
        updateTokens(body);
        return res;
      });
    } else return res;
  });
}

export function logout(){
  clearTokens();
}

'use strict';
import { createStore } from 'redux';
import reducers from '../../views/reducers.js';
import db from './db.js';
import { isNoDataRoute } from './policies.js';

export function prepareStore(req){
  let state = {
    user: req.user? {
      _id: req.user._id,
      username: req.user.username,
      admin: req.user.admin
    }: {},
    selectedAnime: '',
    animeList: {}
  };
  if(isNoDataRoute(req.originalUrl)) return Promise.resolve(createStore(reducers, state));
  return db().then(conn => conn.collection('anime').find().toArray().then(animeList => {
    animeList.forEach(anime => state.animeList[anime._id] = anime);
    return Promise.resolve(createStore(reducers, state));
  }));
};

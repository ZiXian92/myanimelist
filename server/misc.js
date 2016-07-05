'use strict';
import { createStore } from 'redux';
import reducers from '../views/reducers.js';
import db from './db.js';

export function prepareStore(req){
  let state = {
    selectedAnime: '',
    animeList: {}
  };
  return db().then(conn => conn.collection('anime').find().toArray().then(animeList => {
    animeList.forEach(anime => state.animeList[anime._id] = anime);
    return Promise.resolve(createStore(reducers, state));
  }));
};

'use strict';
import { combineReducers } from 'redux';
import selectedAnime from './anime/animereducer.js';
import animeList from './animelist/animelistreducer.js';
import user from './user/user-reducer.js';

const reducers = combineReducers({
  user,
  selectedAnime,
  animeList
});

export default reducers;

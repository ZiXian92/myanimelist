'use strict';
import { combineReducers } from 'redux';
import selectedAnime from './anime/animereducer.js';
import animeList from './animelist/animelistreducer.js';

const reducers = combineReducers({
  selectedAnime,
  animeList
});

export default reducers;

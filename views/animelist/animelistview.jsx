'use strict';
import React from 'react';

const AnimeListView = ({animeList})=>(
  <ul>
  {Object.keys(animeList).map((k, i)=>(
    <li key={i}>{animeList[k].title}</li>
  ))}
  </ul>
);

export default AnimeListView;

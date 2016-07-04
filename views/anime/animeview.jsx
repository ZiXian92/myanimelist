'use strict';
import React from 'react';

const Anime = ({anime, onSubmit})=>(
  <div>
    <h2>{anime.title}</h2>
    <p>{anime.description}</p>
  </div>
);

export default Anime;

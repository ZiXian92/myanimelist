'use strict';
import React from 'react';

const App = ({children})=>(
  <div className="container-fluid">
    <h1>My Anime List</h1>
    {children}
  </div>
);

export default App;

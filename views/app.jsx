'use strict';
import React from 'react';
import NavbarContainer from './navbar/navbar.js';

const App = ({children})=>(
  <div className="container-fluid">
    <NavbarContainer />
    {children}
  </div>
);

export default App;

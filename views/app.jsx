'use strict';
import React from 'react';
import NavbarView from './navbar/navbarview.jsx';

const App = ({children})=>(
  <div className="container-fluid">
    <NavbarView />
    {children}
  </div>
);

export default App;

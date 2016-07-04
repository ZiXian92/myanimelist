'use strict';
import React from 'react';
import { IndexLink } from 'react-router';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const NavbarView = ()=>(
  <Navbar inverse fluid>
    <Navbar.Header>
      <Navbar.Brand><IndexLink to='/'>My Anime List</IndexLink></Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <LinkContainer to={{ pathname: '/login' }}><NavItem eventKey={1}>Login</NavItem></LinkContainer>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default NavbarView;

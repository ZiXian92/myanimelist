'use strict';
import React from 'react';
import { IndexLink } from 'react-router';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const NavbarView = ({username, logout})=>(
  <Navbar inverse fluid>
    <Navbar.Header>
      <Navbar.Brand><IndexLink to='/'>My Anime List</IndexLink></Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullRight>
      {username?
        <NavDropdown eventKey={1} title={username}>
          <MenuItem eventKey={1.1} onClick={logout}>Logout</MenuItem>
        </NavDropdown>:
        <LinkContainer to={{ pathname: '/login' }}><NavItem eventKey={1}>Login</NavItem></LinkContainer>
      }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default NavbarView;

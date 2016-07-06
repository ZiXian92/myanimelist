'use strict';
import React from 'react';
import { browserHistory } from 'react-router';
import { Col, Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
require('isomorphic-fetch');

export default class Login extends React.Component {
  constructor(){
    super();
    this.isValidUsername = this.isValidUsername.bind(this);
    this.isValidPassword = this.isValidPassword.bind(this);
    this.setUsername = this.setUsername.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.login = this.login.bind(this);
    this.state = {
      username: '',
      password: ''
    };
  }
  isValidUsername(){
    let validRegex = /^[\w]+([\.]?[\w]+)?$/;
    return validRegex.test(this.state.username)? 'success': 'error';
  }
  isValidPassword(){
    let validRegex = /^[\w]{8,}$/;
    return validRegex.test(this.state.password)? 'success': 'error';
  }
  setUsername(e){
    this.setState({ username: e.target.value });
  }
  setPassword(e){
    this.setState({ password: e.target.value });
  }
  login(e){
    let self = this;
    e.preventDefault();
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    }).then((res) => {
      if(res.status===200) browserHistory.push('/');
      else console.log('Invalid login credentials.');
    });
  }
  render(){
    return (
      <Col xs={12} sm={8} smOffset={2}>
        <form onSubmit={this.login}>
          <FormGroup controlId="username" validationState={this.isValidUsername()}>
            <ControlLabel>Username</ControlLabel>
            <FormControl name="username" type="text" value={this.state.username} onChange={this.setUsername} required />
          </FormGroup>
          <FormGroup controlId="password" validationState={this.isValidPassword()}>
            <ControlLabel>Password</ControlLabel>
            <FormControl type="password" value={this.state.password} onChange={this.setPassword} required />
          </FormGroup>
          <Button type="submit">Submit</Button>
        </form>
      </Col>
    );
  }
}

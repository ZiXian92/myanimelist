'use strict';
import React from 'react';
import { browserHistory } from 'react-router';
import objectAssign from 'object-assign';
import { Col, Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import { get, login } from '../fetch-wrapper.js';

export default class LoginView extends React.Component {
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
  componentDidMount(){
    if(this.props.isLoggedIn) browserHistory.push('/');
  }
  componentDidUpdate(){
    if(this.props.isLoggedIn) browserHistory.push('/');
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
    login(objectAssign({}, this.state)).then(res => {
      if(res.status===200){
        get('/api/me').then(res => {
          if(res.status===200){
            res.json().then(user => {
              this.props.setUser(user);
              browserHistory.push('/');
            }).catch(err => console.log(err));
          } else console.log('Something went wrong on server side.');
        });
      } else if(res.status===401) console.log('Invalid login credentials.');
    }).catch(err => console.log(err));
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

LoginView.propTypes = {
  setUser: React.PropTypes.func.isRequired
};

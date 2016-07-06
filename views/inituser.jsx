'use strict';
import React from 'react';
import { withRouter } from 'react-router';
import { Col, Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
require('isomorphic-fetch');

class InitUserPage extends React.Component {
  constructor(){
    super();
    this.isValidUsername = this.isValidUsername.bind(this);
    this.isValidPassword = this.isValidPassword.bind(this);
    this.setUsername = this.setUsername.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.state = {
      username: '',
      password: ''
    };
  }
  componentDidMount(){
    this.props.router.setRouteLeaveHook(this.props.route, () => {
      return `You will only be able to see an empty app because there is no user to add content. Please set up an account for yourself first!`;
    });
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
  submitForm(e){
    let self = this;
    e.preventDefault();
    fetch('/init', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    }).then(() => self.props.history.push('/login')).catch(() => {
      console.log('Error adding initial user. Do something.');
    });
  }
  render(){
    return (
      <Col xs={12} sm={8} smOffset={2}>
        <form onSubmit={this.submitForm}>
          <FormGroup controlId="username" validationState={this.isValidUsername()}>
            <ControlLabel>Username</ControlLabel>
            <FormControl name="username" type="text" placeholder="No whitespace, at most 1 dot" value={this.state.username} onChange={this.setUsername} required />
          </FormGroup>
          <FormGroup controlId="password" validationState={this.isValidPassword()}>
            <ControlLabel>Password</ControlLabel>
            <FormControl type="password" placeholder="At least 8 alphanumeric characters" value={this.state.password} onChange={this.setPassword} required />
          </FormGroup>
          <Button type="submit">Submit</Button>
        </form>
      </Col>
    );
  }
};

const InitUser = withRouter(InitUserPage);

export default InitUser;

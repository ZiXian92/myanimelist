'use strict';
import { connect } from 'react-redux';
import { setUser } from '../user/user-actions.js';
import LoginView from './loginview.jsx';

function mapStateToProps(state, ownProps){
  return {
    isLoggedIn: state.user._id
  };
}

function mapDispatchToProps(dispatch, ownProps){
  return {
    setUser: user => dispatch(setUser(user))
  };
}

const Login = connect(mapStateToProps, mapDispatchToProps)(LoginView);

export default Login;

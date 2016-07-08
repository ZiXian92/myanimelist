'use strict';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { logout } from '../fetch-wrapper.js';
import { clearUser } from '../user/user-actions.js';
import NavbarView from './navbarview.jsx';

function mapStateToProps(state, ownProps){
  return {
    username: state.user._id? state.user.username: null
  };
}

function mapDispatchToProps(dispatch, ownProps){
  return {
    logout: () => {
      logout();
      dispatch(clearUser());
      browserHistory.push('/');
    }
  };
}

const NavbarContainer = connect(mapStateToProps, mapDispatchToProps)(NavbarView);

export default NavbarContainer;

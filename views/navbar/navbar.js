'use strict';
import { connect } from 'react-redux';
import NavbarView from './navbarview.jsx';

function mapStateToProps(state, ownProps){
  return {
    user: state.user? state.user.name: null
  };
}

const NavbarContainer = connect(mapStateToProps)(NavbarView);

export default NavbarContainer;

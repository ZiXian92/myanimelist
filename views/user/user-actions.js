'use strict';

export const USER_ACTIONS = {
  SET_USER: 'SET_USER',
  CLEAR_USER: 'CLEAR_USER'
};

export function setUser(user){
  return {
    type: USER_ACTIONS.SET_USER,
    user
  };
}

export function clearUser(){
  return {
    type: USER_ACTIONS.CLEAR_USER
  };
}

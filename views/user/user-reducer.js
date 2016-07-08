'use strict';
import objectAssign from 'object-assign';
import { USER_ACTIONS } from './user-actions.js';

export default function user(user = {}, action){
  switch(action.type){
    case USER_ACTIONS.SET_USER: return action.user;
    case USER_ACTIONS.CLEAR_USER: return {};
    default: return objectAssign({}, user);
  }
}

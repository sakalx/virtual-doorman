import {usersActionsTypes} from '../types';

const {
  SET_LOGGED_USER,
  SET_USERS,
} = usersActionsTypes;



export function setLoggedUser(id) {
  return {
    type: SET_LOGGED_USER,
    payload: id,
  }
}

export function setUsers(users) {
  return {
    type: SET_USERS,
    payload: users,
  }
}
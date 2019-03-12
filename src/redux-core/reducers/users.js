import {usersActionsTypes} from '../types';

const {
  SET_LOGGED_USER,
  SET_USERS,
} = usersActionsTypes;

const initState = {
  users: {},
  currentUserId: null,
};

export default function (state = initState, {type, payload}) {
  switch (type) {

    case SET_LOGGED_USER:
      return ({
        ...state,
        currentUserId: payload,
      });

    case SET_USERS:
      return ({
        ...state,
        users: payload,
      });

  }
  return state;
}
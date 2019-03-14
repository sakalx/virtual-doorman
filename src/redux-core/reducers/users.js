import {usersActionsTypes} from '../types';

const {
  SET_LOGGED_USER,
  SET_USERS,
} = usersActionsTypes;

const initState = {
  data: {},
  currentUser: {
    id: null,
    name: '',
    status: ''
  },
};

export default function (state = initState, {type, payload}) {
  switch (type) {
    case SET_USERS:
      return ({
        ...state,
        data: payload,
      });

    case SET_LOGGED_USER:
      return ({
        ...state,
        currentUser: state.data[payload],
      });
  }

  return state;
}
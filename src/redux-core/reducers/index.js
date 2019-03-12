import {combineReducers} from 'redux';
import {socketTypes} from '../types';

import building from './building';
import doorStation from './doorStation';
import notifications from './notification';
import snackbar from './snackbar';
import socket from './socket';
import users from './users';

const appReducer = combineReducers({
  building,
  doorStation,
  notifications,
  snackbar,
  socket,
  users,
});

const rootReducer = (state, action) => {
  if (action.type === socketTypes.SOCKET_DISCONNECTED) {
    state = undefined;
  }

  return appReducer(state, action)
};

export default rootReducer;
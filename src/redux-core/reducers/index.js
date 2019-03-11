import {combineReducers} from 'redux';
import {userActionsTypes} from '../types';

import building from './building';
import doorStation from './doorStation';
import notifications from './notification';
import operators from './operator';
import snackbar from './snackbar';
import user from './user';

const appReducer = combineReducers({
  building,
  doorStation,
  notifications,
  operators,
  snackbar,
  user,
});

const rootReducer = (state, action) => {
  if (action.type === userActionsTypes.LOG_OUT) {
    state = undefined;
  }

  return appReducer(state, action)
};

export default rootReducer;
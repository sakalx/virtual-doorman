import {combineReducers} from 'redux';
import {authentication} from '../types';

import auth from './auth';
import building from './building';
import doorStation from './doorStation';
import notifications from './notification';
import operators from './operator';
import snackbar from './snackbar';

const appReducer = combineReducers({
  auth,
  building,
  doorStation,
  notifications,
  operators,
  snackbar,
});

const rootReducer = (state, action) => {
  if (action.type === authentication.LOG_OUT) {
    localStorage.clear();
    state = undefined;
  }

  return appReducer(state, action)
};

export default rootReducer;
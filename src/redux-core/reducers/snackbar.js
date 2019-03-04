import {TOGGLE_SNACKBAR} from '../types';

const initState = {
  openSnackBar: false,
  snackBarMsg: '',
};

export default function(state = initState, {type, payload}) {

  if (type === TOGGLE_SNACKBAR) {
    return ({
      ...state,
      openSnackBar: !state.openSnackBar,
      snackBarMsg: payload
    });
  }
  return state;
}
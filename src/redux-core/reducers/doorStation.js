import {doorStation} from '../types';

const {
  SET_SELECTED_DOOR_STATION,
} = doorStation;

const initState = {
  selected: '',
};

export default function (state = initState, {type, payload}) {

  switch (type) {
    case SET_SELECTED_DOOR_STATION:
      return ({
        ...state,
        selected: payload,
      });
  }

  return state;
}
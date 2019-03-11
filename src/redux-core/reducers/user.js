import {userActionsTypes} from '../types';

const {
  LOADING_USER,
  LOG_IN,
} = userActionsTypes;

const initState = {
  user: null,
  isLoading: false,
};

export default function (state = initState, {type, payload}) {
  switch (type) {

    case LOG_IN:
      return {
        ...state,
        user: payload,
      };

    case LOADING_USER:
      return {
        ...state,
        isLoading: payload,
      };
  }
  return state;
}
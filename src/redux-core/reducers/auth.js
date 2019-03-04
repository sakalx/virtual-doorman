import {authentication} from '../types';

const {
  LOADING_AUTH,
  LOG_IN,
} = authentication;

const initState = {
  user: null,
  isLoading: false,
};

export default function (state = initState, {type, payload}) {
  switch (type) {

    case LOG_IN:
      localStorage.setItem('user', JSON.stringify(payload));

      return {
        ...state,
        user: payload,
      };

    case LOADING_AUTH:
      return {
        ...state,
        isLoading: payload,
      };
  }
  return state;
}
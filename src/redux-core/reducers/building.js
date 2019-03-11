import {promise, buildings} from '../types';

const {
  FULFILLED,
  PENDING,
  REJECTED,
} = promise;

const {
  GET_BUILDING_DATA,
  SET_SELECTED_BUILDING,
} = buildings;

const initState = {
  data: [],
  selected: {
    ID: '',
    NAME: '',
  },
  error: null,
  fetching: false,
};

export default function (state = initState, {type, payload}) {

  switch (type) {
    case GET_BUILDING_DATA + PENDING:
      return ({
        ...state,
        fetching: true,
      });

    case GET_BUILDING_DATA + FULFILLED:
      return ({
        ...state,
        error: null,
        fetching: false,
        data: payload,
      });

    case GET_BUILDING_DATA + REJECTED:
      return ({
        ...state,
        error: payload,
        fetching: false,
      });

    case SET_SELECTED_BUILDING:
      const selected = state.data.find(({ID}) => ID === payload) || initState.selected;

      return ({
        ...state,
        selected,
      });
  }

  return state;
}

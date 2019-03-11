import {promise, operators} from '../types';

import string from 'root/utils/string';

const {
  FULFILLED,
  PENDING,
  REJECTED,
} = promise;

const {
  GET_OPERATORS_INFO,
} = operators;

const initState = {
  data: [],
  error: null,
  fetching: false,
};

export default function (state = initState, {type, payload}) {

  switch (type) {
    case GET_OPERATORS_INFO + PENDING:
      return ({
        ...state,
        fetching: true,
      });

    case GET_OPERATORS_INFO + FULFILLED:
      payload.sort(({LIVE_AGENT_STATUS}) => {
        const status = string.removeUnderscore(LIVE_AGENT_STATUS);
        if (status === 'Online') return -1;
        return 0;
      });

      return ({
        ...state,
        error: null,
        fetching: false,
        data: payload,
      });

    case GET_OPERATORS_INFO + REJECTED:
      return ({
        ...state,
        error: payload,
        fetching: false,
      });
  }

  return state;
}

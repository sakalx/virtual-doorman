import getOperators from 'root/api/getOperators';
import {operators} from '../types';

const {
 GET_OPERATORS_INFO,
} = operators;

export function getOperatorsInfo() {
  return {
    type: GET_OPERATORS_INFO,
    payload: getOperators(),
  }
}
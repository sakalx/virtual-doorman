import checkStatus from "root/api/checkStatusResponse";
import getOperators from './getOperators';

export default function (name, password) {
  return getOperators().then(data =>
    data.find(({LOGIN_NAME}) => LOGIN_NAME === name)
  );
}
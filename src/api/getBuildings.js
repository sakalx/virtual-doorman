import checkStatus from './checkStatusResponse';

const PNET_URL = 'http://104.248.110.70:3000/allbuildings';

export default function () {
  return fetch(PNET_URL)
    .then(checkStatus)
    .then(isJson => isJson.json());
}
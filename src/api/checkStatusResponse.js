export default (response) =>
  (response.status === 200)
    ? Promise.resolve(response)
    : Promise.reject(new Error(response.statusText));
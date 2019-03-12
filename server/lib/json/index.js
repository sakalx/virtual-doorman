function parseJson(str) {

  try {
    return JSON.parse(str);
  } catch (e) {
    return null;
  }

}

module.exports = {
  parseJson,
};
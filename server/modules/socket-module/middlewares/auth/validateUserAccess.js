function validateUserAccess(userAccess, next) {
  let validUserAccess = null;

  try {
    validUserAccess = JSON.parse(userAccess);
  } catch (e) {
    next(new Error('not valid user access'));
  }

  return validUserAccess
}

module.exports = validateUserAccess;
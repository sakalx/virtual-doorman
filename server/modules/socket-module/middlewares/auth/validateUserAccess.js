function validateUserAccess(userAccess, next) {
  let validUserAccess = null;

  try {
    validUserAccess = JSON.parse(userAccess);

    if (typeof validUserAccess.userName !== 'string'
      || typeof validUserAccess.password !== 'string') throw '';

  } catch (e) {
    next(new Error('not valid user access'));
  }

  return validUserAccess
}

module.exports = validateUserAccess;
const userStore = require('../../users/store');

function validateSession(next) {
  return (err, sess) => {
    if (err) return next(new Error(`load session:  ${err}`));

    sess && userStore[sess.userId]
      ? next()
      : next(new Error('not authorized'));
  };
}

module.exports = validateSession;
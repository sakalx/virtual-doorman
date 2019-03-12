const userStore = require('../../users/store');

function validateSession(next) {
  return (err, sess) => {
    if (err) return next(new Error(`load session:  ${err}`));

    if (sess && userStore[sess.userId]) {
      userStore[sess.userId].status = 'online';
      next();
    } else {
      next(new Error('not authorized'));
    }
  };
}

module.exports = validateSession;
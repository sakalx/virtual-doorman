module.exports = function (io) {

  const sessionStore = require('../../session-module')['sessionStore'];


  const userSqlDb = [
    {
      id: 'some unic id',
      name: 'sakal',
      password: 'user-password',
    },
  ];

  const userStore = {};


  function sigIn(user, session, next) {
    const authUser = userSqlDb.find(({name}) => name === user.userName);

    if (authUser) {
      if (authUser.password === user.password) {
        session.userId = authUser.id;
        next();
      } else {
        next(new Error('Incorrect password'));
      }
    } else {
      next(new Error('User not found'));
    }

  }


  const cookie = require('cookie');
  const cookieParser = require('cookie-parser');


  const config = require('../../../config');

  io.use(function (socket, next) {

    const session = socket.request.session;
    const cookies = cookie.parse(socket.request.headers.cookie);
    const sid = cookieParser.signedCookie(cookies['connect.sid'], config.session.secret);

    function validateUserAccess(userAccess) {
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

    const userAccess = validateUserAccess(socket.handshake.query.user);


    console.warn(userAccess);

    const validateSession = (err, sess) => {
      if (err) next(new Error(`load session:  ${err}`));

      if (!sess || !userStore[sess.userId]) {
        next(new Error('not authorized'));
      } else {
        next();
      }
    };

    if (userAccess) {

      sigIn(userAccess, session, next);
    } else {


      sessionStore.load(sid, validateSession);
    }
  });

};
module.exports = function (io) {
  const tough = require('tough-cookie');
  const Cookie = tough.Cookie;

  const cookieParser = require('cookie-parser');

  const config = require('../../../../config');
  const sessionStore = require('../../../session-module')['sessionStore'];
  const parseJson = require('../../../../lib/json')['parseJson'];
  const sigIn = require('./sigIn');
  const validateSession = require('./validateSession');

  io.use(function (socket, next) {
    const session = socket.request.session;
    const cookie = Cookie.parse(socket.request.headers.cookie);

    const sid = cookieParser.signedCookie(cookie['connect.sid'], config.session.secret);
    const userAccess = parseJson(socket.handshake.query.user);

    userAccess
      ? sigIn(userAccess, session, next)
      : sessionStore.load(sid, validateSession(next));
  });

};
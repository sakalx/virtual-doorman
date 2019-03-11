module.exports = function (io) {

  const cookie = require('cookie');
  const cookieParser = require('cookie-parser');

  const config = require('../../../../config');
  const sessionStore = require('../../../session-module')['sessionStore'];
  const isJsonString = require('../../../../lib/json');
  const sigIn = require('./sigIn');
  const validateSession = require('./validateSession');

  io.use(function (socket, next) {
    const session = socket.request.session;
    const cookies = cookie.parse(socket.request.headers.cookie);
    const sid = cookieParser.signedCookie(cookies['connect.sid'], config.session.secret);
    const userAccess = socket.handshake.query.user;

    userAccess && isJsonString(userAccess)
      ? sigIn(userAccess, session, next)
      : sessionStore.load(sid, validateSession(next));
  });

};
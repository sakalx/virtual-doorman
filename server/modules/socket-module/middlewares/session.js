module.exports = function (io) {

  const sessionMiddleware = require('../../../modules/session-module')['sessionMiddleware'];

  io.use(function(socket, next) {
    sessionMiddleware(socket.request, socket.request.res, next);
  });

};
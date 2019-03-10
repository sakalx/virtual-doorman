module.exports = function (io) {

  io.use(function(socket, next) {
    const handshakeData = socket.request;

    console.log(handshakeData._query.token);
    // make sure the handshake data looks good as before
    // if error do this:
    // next(new Error('not authorized'));
    // else just call next
    next();
  });

};
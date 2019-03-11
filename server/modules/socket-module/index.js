module.exports = function (server) {
  const io = require('socket.io')(server);

  // Middlewares
  require('./middlewares/session')(io);
  require('./middlewares/auth')(io);


  // Sockets
  const initNotifications = require('./notifications/initialization');
  const onNewNotification = require('./notifications/onNew');
  const onUpdateNotification = require('./notifications/onUpdate');


  io.on('connection', function (socketClient) {
    console.log('New Socket connected', socketClient.id);

    // socket.emit('user', userStore[sess.userId]);

    //console.warn(socketClient.handshake.headers);
    // Initialization notifications on server from SQL and push to sockets
    //initNotifications(io);
    // Socket listening new notification
    //onNewNotification(io, socketClient);
    // Socket listening any updates notification
    //onUpdateNotification(io, socketClient);

    socketClient.on('disconnect', () => {
      console.warn('Socket disconnected', socketClient.id);
    });

    socketClient.on('error', error => {
      console.warn('socketClient error :', error);
    });
  });

};
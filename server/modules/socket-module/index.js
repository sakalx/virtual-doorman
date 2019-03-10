module.exports = function (server) {

  const io = require('socket.io')(server);

  // Middlewares
  require('./middlewares/auth')(io);

  // Sockets
  const onNewNotification = require('./notifications/onNew')(io);
  const onUpdateNotification = require('./notifications/onUpdate')(io);
  const initNotifications = require('./notifications/initialization')(io);


  io.on('connection', function (socketClient) {
    console.log('New Socket connected', socketClient.id);


    // Initialization notifications on server from SQL and push to sockets
    initNotifications();
    // Socket listening new notification
    onNewNotification(socketClient);
    // Socket listening any updates notification
    onUpdateNotification(socketClient);

    socketClient.on('disconnect', function () {
      console.warn('Socket disconnected', socketClient.id);
    });
  });

};
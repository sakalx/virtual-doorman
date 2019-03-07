module.exports = function (server) {

  const io = require('socket.io')(server);

  // [Glob] variables :
  const notificationsStorage = {};

  const onNewNotification = require('./notifications/onNew')(io, notificationsStorage);
  const onUpdateNotification = require('./notifications/onUpdate')(io, notificationsStorage);
  const initNotifications = require('./notifications/initialization')(io, notificationsStorage);


  io.on('connection', function (socket) {
    console.log('New Socket connected', socket.id);

    // Initialization notifications on server from SQL and push to sockets
    initNotifications();
    // Socket listening new notification
    onNewNotification(socket);
    // Socket listening any updates notification
    onUpdateNotification(socket);

    socket.on('disconnect', function () {
      console.warn('Socket disconnected', socket.id);
    });
  });

};
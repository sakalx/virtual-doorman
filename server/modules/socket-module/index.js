module.exports = function (server) {
  const io = require('socket.io')(server);
  const eventName = require('./eventNames');

  // Middlewares
  require('./middlewares/initialization')();
  require('./middlewares/session')(io);
  require('./middlewares/auth')(io);


  // Store
  const userStore = require('./users/store');
  const notificationsStore = require('./notifications/store');


  // Sockets
  const onNewNotification = require('./notifications/onNew');
  const onUpdateNotification = require('./notifications/onUpdate');


  io.on('connection', function (socketClient) {
    console.log('New Socket connected', socketClient.id);
    const userId = socketClient.request.session.userId;

    socketClient.on('client connected', () => {
      socketClient.emit(eventName.users, userStore);
      socketClient.emit(eventName.notifications, notificationsStore);
      socketClient.emit(eventName.currentUser, userId);
    });




    //socketClient.emit(eventName.notification, notificationsStore);
    //socketClient.emit(eventName.userConnected, userId);

    // Socket listening new notification
    //onNewNotification(io, socketClient);
    // Socket listening any updates notification
    //onUpdateNotification(io, socketClient);

    socketClient.on('disconnect', (reason) => {
      console.warn('Socket disconnected', socketClient.id, reason);
      // [TODO] set user offline
    });

    socketClient.on('error', error => {
      console.warn('socketClient error :', error);
    });
  });

};
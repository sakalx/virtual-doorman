module.exports = function (server) {
  const io = require('socket.io')(server);
  const eventNames = require('./eventNames');

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
    const {session} = socketClient.request;


    socketClient.emit('foo', 'userStore');

    socketClient.emit(eventNames.users, userStore);
    socketClient.emit(eventNames.notifications, notificationsStore);
    socketClient.emit(eventNames.currentUser, session.userId);

    // Socket listening new notification
    onNewNotification(io, socketClient);
    // Socket listening any updates notification
    onUpdateNotification(io, socketClient);

    socketClient.on(eventNames.signOut, () => {
      socketClient.disconnect();
      session.destroy();
    });

    socketClient.on('disconnect', (reason) => {
      console.warn('Socket disconnected', socketClient.id, reason);
      // [TODO] set user offline
    });

    socketClient.on('error', error => {
      console.warn('socketClient error :', error);
    });
  });
};

// [TODO] validation incoming data from sockets !!!
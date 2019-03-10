module.exports = function (server) {

  const io = require('socket.io')(server);

  const firebaseAdmin = require('firebase-admin');
  const serviceFirebaseAccount = require('../firebase-module/virtual-doorman-x-firebase-adminsdk-lzfpe-239dfa3e37.json');

  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceFirebaseAccount),
    databaseURL: "https://virtual-doorman-x.firebaseio.com"
  });

  // [Glob] variables :
  // [TODO] move this storage to notification folder
  const notificationsStorage = {};

  const onNewNotification = require('./notifications/onNew')(io, notificationsStorage);
  const onUpdateNotification = require('./notifications/onUpdate')(io, notificationsStorage);
  const initNotifications = require('./notifications/initialization')(io, notificationsStorage);


  io.use(function(socket, next) {
    const handshakeData = socket.request;
    console.log(handshakeData._query.token);
    // make sure the handshake data looks good as before
    // if error do this:
    // next(new Error('not authorized'));
    // else just call next
    next();
  });

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
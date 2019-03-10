module.exports = function (server) {

  const io = require('socket.io')(server);
  const socketIOauth = require('socketio-auth');

  const firebaseAdmin = require('firebase-admin');
  const serviceFirebaseAccount = require('../firebase-module/virtual-doorman-x-firebase-adminsdk-lzfpe-239dfa3e37.json');

  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceFirebaseAccount),
    databaseURL: "https://virtual-doorman-x.firebaseio.com"
  });

  // [Glob] variables :
  const notificationsStorage = {};

  // const onNewNotification = require('./notifications/onNew')(io, notificationsStorage);
  // const onUpdateNotification = require('./notifications/onUpdate')(io, notificationsStorage);
  // const initNotifications = require('./notifications/initialization')(io, notificationsStorage);


  socketIOauth(io, {
    authenticate: function (socketClient, token, callback) {
      console.log('authenticate token', token);
      firebaseAdmin.auth().verifyIdToken(token)
        .then(function(decodedToken) {
          const uid = decodedToken.uid;
          console.warn(uid);
          console.log(decodedToken);
        }).catch(function(error) {
        console.error(error);
      });
    },

    postAuthenticate: function (socketClient, data) {
      console.log('socketClient authenticated', socketClient.id);
      console.log('postAuthenticate data :', data);
      //socketClient.client.user = user;
    },

    disconnect: function (socketClient) {
      console.log('socketClient disconnected', socketClient.id);
    },
  });

/*  io.on('connection', function (socket) {
    console.log('New Socket connected', socket.id);


    // Initialization notifications on server from SQL and push to sockets
    //initNotifications();
    // Socket listening new notification
    //onNewNotification(socket);
    // Socket listening any updates notification
    //onUpdateNotification(socket);

    socket.on('disconnect', function () {
      console.warn('Socket disconnected', socket.id);
    });
  });*/

};
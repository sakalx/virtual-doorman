module.exports = function (io, notificationsStorage) {

  const eventName = require('../eventNames');
  const sql = require('../../sql');

  return function (socket) {
    // Socket listening new notification
    socket.on(eventName.newNotification, function (notification) {
      // Save to glob variable [notifications]
      const uid = notification.id;
      notificationsStorage[uid] = notification;

      // Push notification to sockets
      io.emit(eventName.notification, {[uid]: notification});

      // Insert notification to SQL
      sql.insertToTable({
        table: sql.table.notifications,
        payload: notification,
      });
    });
  }

};


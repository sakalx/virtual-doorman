module.exports = function (io, notificationsStorage) {

  const eventName = require('./eventNames');
  const sql = require('../sql');

  return function (socket) {
    // Socket listening any updates notification
    socket.on(eventName.updateNotification, function ({uid, payload}) {
      // Updating glob variable [notifications] by id
      const updatedNotification = notificationsStorage[uid];
      Object.entries(payload).forEach(([key, value]) => {
        updatedNotification[key] = value;
      });

      // Push notification to sockets
      io.emit(eventName.notification, {[uid]: updatedNotification});

      // Update notification in SQL
      sql.updateTableById({
        table: sql.table.notifications,
        uid,
        payload,
      });
    });
  }

};
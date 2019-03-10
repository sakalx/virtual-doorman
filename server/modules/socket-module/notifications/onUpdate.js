module.exports = function (io) {

  const store = require('./store');
  const eventName = require('../eventNames');
  const sql = require('../../sql-module');

  return function (socketClient) {
    // Socket listening any updates notification
    socketClient.on(eventName.updateNotification, function ({uid, payload}) {
      // Updating notification store by id
      const currentNotification = store[uid];

      Object.entries(payload).forEach(([key, value]) => {
        currentNotification[key] = value;
      });

      // Push notification to sockets
      io.emit(eventName.notification, {[uid]: currentNotification});

      // Update notification in SQL
      sql.updateTableById({
        table: sql.table.notifications,
        uid,
        payload,
      });
    });
  }

};
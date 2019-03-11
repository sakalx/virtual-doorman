module.exports = function (io, socketClient) {

  const store = require('./store');
  const eventName = require('../eventNames');
  const sql = require('../../sql-module');

  // Socket listening new notification
  socketClient.on(eventName.newNotification, function (notification) {
    // Save to notification store
    const uid = notification.id;
    store[uid] = notification;

    // Push notification to sockets
    io.emit(eventName.notification, {[uid]: notification});

    // Insert notification to SQL
    sql.insertToTable({
      table: sql.table.notifications,
      payload: notification,
    });
  });

};


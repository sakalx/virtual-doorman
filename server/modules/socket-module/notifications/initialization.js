module.exports = function (io) {

  const store = require('./store');
  const eventName = require('../eventNames');
  const sql = require('../../sql-module');

  let isInitNotifications = false;

  return function () {
    // Initialization notifications on server from SQL and push to sockets
    if (isInitNotifications) {
      io.emit(eventName.notification, store);
    } else {
      const sqlOnResult = data => {
        const uid = data.id;
        const notification = {
          [uid]: {...data},
        };

        Object.assign(store, notification);
      };

      const sqlOnEnd = () => {
        io.emit(eventName.notification, store);
      };

      sql.getDataFromTable({
        table: sql.table.notifications,
        callBackResult: sqlOnResult,
        callBackEnd: sqlOnEnd,
      });

      isInitNotifications = true;
    }
  }

};
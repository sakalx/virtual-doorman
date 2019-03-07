module.exports = function (io, notificationsStorage) {

  const eventName = require('../eventNames');
  const sql = require('../../sql');

  let isInitNotifications = false;

  return function () {
    // Initialization notifications on server from SQL and push to sockets
    if (isInitNotifications) {
      io.emit(eventName.notification, notificationsStorage);
    } else {
      const sqlOnResult = data => {
        const uid = data.id;
        const notification = {
          [uid]: {...data},
        };

        Object.assign(notificationsStorage, notification);
      };

      const sqlOnEnd = () => {
        io.emit(eventName.notification, notificationsStorage);
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
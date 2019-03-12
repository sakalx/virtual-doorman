module.exports = function () {

  const sql = require('../../../sql-module');
  const userStore = require('../../users/store');
  const notificationsStore = require('../../notifications/store');

  let isInit = false;

  if (!isInit) {
    initUsers();
    initNotification();
  }

  function initNotification() {
    const sqlOnResult = data => {
      const uid = data.id;
      const notification = {
        [uid]: {...data},
      };

      Object.assign(notificationsStore, notification);
    };

    const sqlOnEnd = () => {

    };

    sql.getDataFromTable({
      table: sql.table.notifications,
      callBackResult: sqlOnResult,
      callBackEnd: sqlOnEnd,
    });
  }

  function initUsers() {
    const sqlOnResult = data => {
      const uid = data.id;

      const users = {
        [uid]: {
          id: uid,
          name: data.name,
          status: 'offline',
        },
      };

      Object.assign(userStore, users);
    };

    sql.getDataFromTable({
      table: sql.table.users,
      callBackResult: sqlOnResult,
      callBackEnd: () => isInit = true,
    });
  }
};
module.exports = function (io) {

  // [NOTE] Duplicate logic with initialization notification
  // [TODO] make one module for init any data

  const store = require('./store');
  const eventName = require('../eventNames');
  const sql = require('../../sql-module');

  let isInitUsers = false;

  // Initialization users on server from SQL and push to sockets
  if (isInitUsers) {
    io.emit(eventName.users, store);
  } else {

    const sqlOnResult = data => {
      const uid = data.id;
      const users = {
        [uid]: {
          id: uid,
          name: data.name,
          status: 'offline',
        },
      };

      Object.assign(store, users);
    };

    const sqlOnEnd = () => {
      io.emit(eventName.users, store);
      isInitUsers = true;
    };

    sql.getDataFromTable({
      table: sql.table.users,
      callBackResult: sqlOnResult,
      callBackEnd: sqlOnEnd,
    });
  }

};
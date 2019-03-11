module.exports = function (user, session, next) {

  const sql = require('../../../sql-module');
  const userStore = require('../../users/store');

  let userFromDb = null;

  sql.getDataFromRow({
    table: sql.table.users,
    option: {
      key: 'name',
      value: user.name,
    },
    callBackResult: user => userFromDb = user,
    callBackEnd: sqlOnEnd,
  });


  function sqlOnEnd() {

    if (!userFromDb) return next(new Error('User not found'));
    if (userFromDb.password !== user.password) return next(new Error('Incorrect password'));

    const userId = userFromDb.id;
    session.userId = userId;

    userStore[userId] = {
      id: userId,
      name: userFromDb.name,
      status: 'online',
    };
    next();
  }

};
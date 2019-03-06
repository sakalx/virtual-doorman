const app = require('express')();
const http = require('http').Server(app);
const mysql = require('mysql');
const io = require('socket.io')(http);

// Connecting to SQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '2015My0234$',
  database: 'vdmdb'
});

db.connect(function (error) {
  if (error) throw error;
  console.log('Connected db');
});

// [Glob] variables :
const notifications = {};
let isInitNotifications = false;

// [Socket] list of events :
const socketEvent = {
  newNotification: 'new notification',
  updateNotification: 'update notification',
  notification: 'notification',
};

// [SQL] list of tables :
const table = {
  notifications: 'notification',
};


// [SQL] INSERT to table :
function getSqlInsertToTable(table) {
  return `INSERT INTO ${table} SET ?`;
}

function insertToTable({table, payload}) {
  const sql = getSqlInsertToTable(table);

  db.query(sql, payload, function (error) {
    if (error) throw error;
    console.log('New data going to db');
  });
}

// [SQL] UPDATE date in table by id :
function getSqlUpdateTable(table, payload) {
  // payload = {foo: 1, bar: 3}
  const sqlColumns = Object.keys(payload).reduce((acc, next) =>
    acc + `${next} = ?, `, '').slice(0, -2); //foo = ?, bar = ?

  const sql = `UPDATE ${table} SET ${sqlColumns} WHERE id = ?`;
  const values = Object.values(payload); // [1, 3]
  return [sql, values];
}

function updateTableById({table, uid, payload}) {
  const [sql, values] = getSqlUpdateTable(table, payload);
  values.push(uid);

  db.query(sql, values, function (error) {
    if (error) throw error;
    console.log('Updating going to db');
  });
}

// [SQL] SELECT all data from table :
function getSqlSelectAllFromTable(table) {
  return `SELECT * FROM ${table}`;
}


io.on('connection', function (socket) {
  console.log('New Socket connected', socket.id);

  // Socket listening new notification
  socket.on(socketEvent.newNotification, function (notification) {
    // Save to glob variable [notifications]
    const uid = notification.id;
    notifications[uid] = notification;

    // Push notification to sockets
    io.emit(socketEvent.notification, {[uid]: notification});

    // Insert notification to SQL
    insertToTable({
      table: table.notifications,
      payload: notification,
    });
  });


  // Socket listening any updates notification
  socket.on(socketEvent.updateNotification, function ({uid, payload}) {
    // Updating glob variable [notifications] by id
    const updatedNotification = notifications[uid];
    Object.entries(payload).forEach(([key, value]) => {
      updatedNotification[key] = value;
    });

    // Push notification to sockets
    io.emit(socketEvent.notification, {[uid]: updatedNotification});

    // Update notification in SQL
    updateTableById({
      table: table.notifications,
      uid,
      payload,
    });
  });

  // Initialization notifications on server from SQL and push to sockets
  if (isInitNotifications) {
    socket.emit(socketEvent.notification, notifications);
  } else {
    const sql = getSqlSelectAllFromTable(table.notifications);

    db.query(sql)
      .on('result', function (data) {
        const uid = data.id;
        const notification = {
          [uid]: {...data},
        };

        Object.assign(notifications, notification);
      })
      .on('end', function () {
        socket.emit(socketEvent.notification, notifications)
      });

    isInitNotifications = true;
  }


  socket.on('disconnect', function () {
    console.log('Socket disconnected', socket.id);
  });
});


http.listen(8000, function () {
  console.log('listening on *:8000');
});


// [TODO] handel reconnect sockets if any errors
// [TODO] handel errors from db
// [TODO] handle unic user connected
// [TODO] function for:
//  1. tracking resolved calls by 'resolved_time' property
//  2. if we got 50 resolved calls
//  2.1. save those calls in file
//  2.2. remove those calls from glob variable 'notifications' && db
//  2.3. emit socket 'notifications list'
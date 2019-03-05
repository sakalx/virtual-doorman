const app = require('express')();
const http = require('http').Server(app);
const mysql = require('mysql');
const io = require('socket.io')(http);

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


const notifications = {};
let isInitNotification = false;

// [TODO] handel reconnect sockets if any errors
// [TODO] handel errors from db
// [TODO] handle unic user connected
// [TODO] function for:
//  1. tracking resolved calls by 'resolved_time' property
//  2. if we got 50 resolved calls
//  2.1. save those calls in file
//  2.2. remove those calls from glob variable 'notifications' && db
//  2.3. emit socket 'notifications list'
io.on('connection', function (socket) {
  console.log('New Socket connected');

  socket.on('add notification', function (notification) {
    const uid = notification.id;

    notifications[uid] = notification;
    io.sockets.emit('notification', {[uid]: notification});

    const sql = 'INSERT INTO notification SET ?';
    db.query(sql, notification, function (error) {
      if (error) throw error;
      console.log('Notification going to db')
    });
  });

  socket.on('update notification', function ({uid, column, value}) {
    notifications[uid][column] = value;
    notifications[uid][column] = value;
    io.sockets.emit('notification', {[uid]: notifications[uid]});


    const sql = `UPDATE notification SET ${column} = ? WHERE id = ?`;

    db.query(sql, [value, uid], function (error) {
      if (error) throw error;
      console.log('Updated notification going to db');
    });

  });

  if (isInitNotification) {
    socket.emit('notification', notifications);
  } else {
    const sql = 'SELECT * FROM notification';
    db.query(sql)
      .on('result', function (data) {
        const uid = data.id;
        const notification = {
          [uid]: {...data},
        };
        Object.assign(notifications, notification);
      })
      .on('end', function () {
        socket.emit('notification', notifications)
      });

    isInitNotification = true;
  }


  socket.on('disconnect', function () {
    console.log('Some socket disconnected');
  });
});


http.listen(8000, function () {
  console.log('listening on *:8000');
});
const app = require('express')();
const http = require('http').Server(app);
const mysql = require('mysql');
const io = require('socket.io')(http);

// Define db creds
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '2015My0234$',
  database: 'vdmdb'
});

// Log any errors connected to the db
db.connect(function (error) {
  if (error) throw error;
  console.log('Connected db');
});

// Define/initialize global vars
const notifications = {};
let isInitNotification = false;


// Socket
io.on('connection', function (socket) {
  console.log('New Socket connected');

  // Listening for new notification
  socket.on('new notification', function (notification) {
    const id = notification.id;

    // Add new notification added
    notifications[id] = notification;
    // Push to all sockets
    io.sockets.emit('notifications list', notifications);

    // Insert into db
    const sql = 'INSERT INTO notification SET ?';
    db.query(sql, notification, function (error) {
      if (error) throw error;
      console.log('Notification inserted to db')
    });
  });

  // Check to see if initial notification are set
  if (isInitNotification) {
    // Initial notification already exist, send out
    socket.emit('notifications list', notifications);
  } else {
    // Initial app start, run db query
    const sql = 'SELECT * FROM notification';

    db.query(sql)
      .on('result', function (data) {
        // Push results onto the notifications object
        const id = data.id;
        const notification = {
          [id]: {...data},
        };
        Object.assign(notifications, notification);
      })
      .on('end', function () {
        // Only emit notes after query has been completed
        socket.emit('notifications list', notifications)
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
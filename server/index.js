const path = require('path');

const express = require('express');
const app = express();
const server = require('http').Server(app);

// Middlewares
const sessionMiddleware = require('./modules/session-module')['sessionMiddleware'];
app.use(sessionMiddleware);

// Keep it for testing reason:
// ===========================================
app.get('/', (req, res) => {
  console.warn('sessionID ', req.sessionID);
  //req.session.userName = 'sakal';
  res.sendFile(path.join(__dirname + '/public/index.html'));
});
app.get('/js/vendor.106fb15d094839eb1da6.bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/js/vendor.106fb15d094839eb1da6.bundle.js'));
});
app.get('/js/index.0d3d723c9c8dab0b4cbe.bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/js/index.0d3d723c9c8dab0b4cbe.bundle.js'));
});
// ===========================================



// Connect socket.io to server
require('./modules/socket-module')(server);

server.listen(8000, function () {
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

// [TODO] validation incoming data from sockets !!!
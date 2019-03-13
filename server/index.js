const express = require('express');
const app = express();
const server = require('http').Server(app);

const config = require('./config');

// Middlewares
const sessionMiddleware = require('./modules/session-module')['sessionMiddleware'];
app.use(sessionMiddleware);

// Connect socket.io to server
require('./modules/socket-module')(server);

server.listen(config.port, function () {
  console.log('listening on *:8000');
});



// Keep it for testing reason:
// ===========================================
/*const path = require('path');

app.get('/', (req, res) => {
  console.warn('sessionID from express', req.sessionID);
  //req.session.userName = 'sakal';
  res.sendFile(path.join(__dirname + '/public/index.html'));
});
app.get('/js/vendor.5c3c131e4dd13d728e65.bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/js/vendor.5c3c131e4dd13d728e65.bundle.js'));
});
app.get('/js/index.e9bee6695f665d5ef216.bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/js/index.e9bee6695f665d5ef216.bundle.js'));
});*/
// ===========================================
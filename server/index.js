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
const path = require('path');

app.get('/', (req, res) => {
  console.warn('sessionID from express', req.sessionID);
  //req.session.userName = 'sakal';
  res.sendFile(path.join(__dirname + '/public/index.html'));
});
app.get('/js/vendor.d7cb5fc3b89a92bc160a.bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/js/vendor.d7cb5fc3b89a92bc160a.bundle.js'));
});
app.get('/js/index.85bd47048611e5b1de21.bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/js/index.85bd47048611e5b1de21.bundle.js'));
});
// ===========================================
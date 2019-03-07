const app = require('express')();
const http = require('http').Server(app);

require('./modules/socket')(http);

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
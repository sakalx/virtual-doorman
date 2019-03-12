import socketIOClient from 'socket.io-client';

const url = 'http://localhost:8000';

const connect = user =>
  socketIOClient.connect(url, {query: `user=${user}`});

export default connect;
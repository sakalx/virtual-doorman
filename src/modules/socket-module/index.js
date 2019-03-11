import socketIOClient from 'socket.io-client';

const url = 'http://localhost:8000';


const socketClient = {
  socket: null,

  connect(user = null) {
    this.socket = socketIOClient.connect(url, {query: `user=${user}`});
  },

  emit(eventName, data) {
    this.socket.emit(eventName, data);
  },

  on(eventName, callback) {
    this.socket.on(eventName, data => callback(data))
  },

  removeListener(eventName, callback) {
    this.socket.removeListener(eventName, callback);
  },
};

const user = JSON.stringify({userName: 'sakal', password: 'user-password'})

socketClient.connect(user);

socketClient.on('connection', socket => {
  console.log('Socket connected ', socket);
  console.log('Socket request ', socket.request);
  console.log('Socket handshake ', socket.handshake);
});

export default socketClient;
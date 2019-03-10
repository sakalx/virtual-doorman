import socketIOClient from 'socket.io-client';

const url = 'http://localhost:8000';


const socketClient = {
  socket: null,

  connect(token) {
    this.socket = socketIOClient.connect(url);
    this.socket.emit('authentication', token);
  },

  emit(eventName, data) {
    if (this.socket) {
      this.socket.emit(eventName, data);
    }
  },

  on(eventName, callback) {
    if (this.socket) {
      this.socket.on(eventName, data => {
        callback(data);
      });
    }
  },

  removeListener(eventName, callback) {
    if (this.socket) {
      this.socket.removeListener(eventName, callback);
    }
  },
};

export default socketClient;
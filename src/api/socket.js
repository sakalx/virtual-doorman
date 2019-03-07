import socketIOClient from 'socket.io-client';

const url = 'http://localhost:8000';

// Socket events :
export const eventName = {
  newNotification: 'new notification',
  updateNotification: 'update notification',
  notification: 'notification',
};

const socketClient = {
  socket: null,

  connect() {
    this.socket = socketIOClient.connect(url);
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
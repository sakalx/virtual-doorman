import socketIOClient from 'socket.io-client';

const url = 'http://localhost:8000';


const socketClient = {
  socket: null,

  connect(user = null) {
    this.socket = socketIOClient.connect(url, {query: `user=${user}`});


    this.socket.on('users', data => {
      console.log('Users data ', data);

    });
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

const user = JSON.stringify({name: 'erik', password: '7777777'});

socketClient.connect(user);


export default socketClient;
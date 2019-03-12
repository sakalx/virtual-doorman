import socketIOClient from 'socket.io-client';

const url = 'http://localhost:8000';

const connectAsync = user => {
  const socket = socketIOClient.connect(url, {query: `user=${user}`});

  return new Promise(function (resolve, reject) {

    socket.on('connect', () => {
      socket.emit('client connected');
      resolve(socket);
    });

    socket.on('error', error => reject(`server error ${error}`));
    socket.on('connect_error', error => reject(`connect error ${error}`));
    socket.on('connect_timeout', timeout => reject(timeout));

    setTimeout(() => {
      if (!socket.id) reject('not connected')
    }, 1000);


    // socket.on('disconnect', (reason) => {
    //   if (reason === 'io server disconnect') {
    //     // the disconnection was initiated by the server, you need to reconnect manually
    //     socket.connect();
    //   }
    //   // else the socket will automatically try to reconnect
    // });
  });
};


export default connectAsync;
import socketIOClient from 'socket.io-client';

//const socket = socketIOClient('http://localhost:8000');
const socket = socketIOClient('http://104.248.110.70:3001')

// Socket events :
export const socketEvent = {
  newNotification: 'new notification',
  updateNotification: 'update notification',
  notification: 'notification',
};

export default socket;
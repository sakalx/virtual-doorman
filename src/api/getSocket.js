import socketIOClient from 'socket.io-client';

const socket = socketIOClient('http://localhost:8000');

// Socket events :
export const socketEvent = {
  newNotification: 'new notification',
  updateNotification: 'update notification',
  notification: 'notification',
};

export default socket;
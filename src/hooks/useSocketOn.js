import {useEffect} from 'react';
import socket from 'root/api/getSocket';


export default function (eventKey, callback) {
  useEffect(() => {
    socket.on(eventKey, callback);
    return () => socket.removeListener(eventKey, callback);
  });

  return socket;
}
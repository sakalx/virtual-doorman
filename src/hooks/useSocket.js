import {useEffect} from 'react';
import socketIOClient from 'socket.io-client';


export default function ({url, eventKey, callback}) {
  const socket = socketIOClient(url);

  useEffect(() => {
    socket.on(eventKey, callback);
    return () => socket.removeListener(eventKey, callback);
  });

  return socket;
}
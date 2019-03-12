import React, {useState, useEffect} from 'react';
import {Route} from 'react-router-dom';

import {connect} from 'react-redux';

import LoginScreen from 'root/screens/Login';


function PrivateRoute({component: Component, socket, ...rest}) {
  const [connected, setConnect] = useState(false);

  useEffect(() => {
    const _connected = () => setConnect(true);
    const _error = err => setConnect(false) && console.info(`server error ${err}`);
    const _connectError = err => setConnect(false) && console.info(`connect error ${err}`);
    const _timeout = timeout => setConnect(false) && console.info(`timeout ${timeout}`);
    const _disconnect = reason => setConnect(false) && console.info(`disconnect ${reason}`);

    if (socket.Client) {
      socket.Client.on('connect', _connected);
      socket.Client.on('error', _error);
      socket.Client.on('connect_error', _connectError);
      socket.Client.on('connect_timeout', _timeout);
      socket.Client.on('disconnect', _disconnect);
    }

    return () => {
      if (socket.Client) {
        socket.Client.removeListener('connect', _connected);
        socket.Client.removeListener('error', _error);
        socket.Client.removeListener('connect_error', _connectError);
        socket.Client.removeListener('connect_timeout', _timeout);
        socket.Client.removeListener('disconnect', _disconnect);
      }
    }
  });

  return (
    connected
      ? <Route{...rest} render={props => <Component {...props}/>}/>
      : <LoginScreen/>
  )
}

const mapStateToProps = ({socket}) => ({
  socket,
});

export default connect(mapStateToProps)(PrivateRoute)
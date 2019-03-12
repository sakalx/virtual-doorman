import React from 'react';
import {Route} from 'react-router-dom';

import {connect} from 'react-redux';

import LoginScreen from 'root/screens/Login';


function PrivateRoute({component: Component, socket, ...rest}) {
  return (
    socket.Client && socket.Client.id
      ? <Route{...rest} render={props => <Component {...props}/>}/>
      : <LoginScreen/>
  )
}

const mapStateToProps = ({socket}) => ({
  socket,
});

export default connect(mapStateToProps)(PrivateRoute)
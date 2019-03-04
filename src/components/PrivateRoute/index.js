import React from 'react';
import {Route} from 'react-router-dom';

import {connect} from 'react-redux';

import LoginScreen from 'root/screens/Login';


function PrivateRoute({component: Component, auth, ...rest}) {
  return (
    (auth.user && auth.user.ID)
      ? <Route{...rest} render={props => <Component {...props}/>}/>
      : <LoginScreen/>
  )
}

const mapStateToProps = ({auth}) => ({
  auth,
});

export default connect(mapStateToProps)(PrivateRoute)
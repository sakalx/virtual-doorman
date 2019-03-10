import React from 'react';
import {Route} from 'react-router-dom';

import {connect} from 'react-redux';

import LoginScreen from 'root/screens/Login';


function PrivateRoute({component: Component, user, ...rest}) {
  // auth.user && auth.user.ID
  return (
    (false)
      ? <Route{...rest} render={props => <Component {...props}/>}/>
      : <LoginScreen/>
  )
}

const mapStateToProps = ({user}) => ({
  user,
});

export default connect(mapStateToProps)(PrivateRoute)
import React, {useEffect} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import PrivateRoute from 'root/components/PrivateRoute'

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {logInUser} from 'root/redux-core/actions/auth';

import socketClient from 'root/api/socket';

import LinearProgress from '@material-ui/core/LinearProgress';

import MainScreen from './screens/Main';

socketClient.connect();


function App({auth, logInUser}) {

  /*FIXME
  *  !!! Not real authentication, just simulation !!!
  *  !!! Not safe, Never use in production !!!
  */
  useEffect(() => {
    const cashedUser = localStorage.getItem('user');
    if (cashedUser) logInUser(JSON.parse(cashedUser));
  }, []);


  return (
    <React.Fragment>
      {auth.isLoading && <LinearProgress style={{position: 'absolute', width: '100%'}}/>}

      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path='/' component={MainScreen}/>
          <Route render={() => <h1>404 page</h1>}/>
        </Switch>
      </BrowserRouter>

    </React.Fragment>
  )
}

const mapStateToProps = ({auth}) => ({
  auth,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  logInUser,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
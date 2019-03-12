import React, {useEffect} from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import PrivateRoute from 'root/components/PrivateRoute'

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {connectUser} from 'root/redux-core/actions/socket';

import MainScreen from './screens/Main';


function App({connectUser}) {

  useEffect(() => {
    connectUser();
  }, []);

  return (
    <HashRouter>
      <Switch>
        <PrivateRoute exact path='/' component={MainScreen}/>
        <Route render={() => <h1>404 page</h1>}/>
      </Switch>
    </HashRouter>
  )
}

const mapDispatchToProps = dispatch => bindActionCreators({
  connectUser,
}, dispatch);

export default connect(null, mapDispatchToProps)(App);
import React, {useEffect} from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import PrivateRoute from 'root/components/PrivateRoute'

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {connectingToServer} from 'root/redux-core/actions/socket';

import MainScreen from './screens/Main';


function App({socket, connectingToServer}) {

  useEffect(() => {
    connectingToServer();
  }, []);

  return (
    <React.Fragment>
      {socket.fetching && <h1>Loading...</h1>}

      <HashRouter>
        <Switch>
          <PrivateRoute exact path='/' component={MainScreen}/>
          <Route render={() => <h1>404 page</h1>}/>
        </Switch>
      </HashRouter>

    </React.Fragment>
  )
}

const mapStateToProps = ({socket}) => ({
  socket,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  connectingToServer,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
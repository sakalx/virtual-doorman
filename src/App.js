import React, {useEffect} from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import PrivateRoute from 'root/components/PrivateRoute'


import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {connectUser} from 'root/redux-core/actions/socket';

import LinearProgress from '@material-ui/core/LinearProgress';
import MainScreen from './screens/Main';


function App({socket, connectUser}) {

  useEffect(() => {
    connectUser();
  }, []);

  return (
    <React.Fragment>
      {socket.fetching && <LinearProgress style={{position: 'absolute', width: '100%'}}/>}

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
  connectUser,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
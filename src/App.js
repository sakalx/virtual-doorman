import React, {useEffect} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import PrivateRoute from 'root/components/PrivateRoute'

//import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
//import {logInUser} from 'root/redux-module/actions/auth';


import LinearProgress from '@material-ui/core/LinearProgress';
import MainScreen from './screens/Main';


function App({user}) {

  useEffect(() => {
    // const cashedUser = localStorage.getItem('user');
    // if (cashedUser) logInUser(JSON.parse(cashedUser));
  }, []);

  return (
    <React.Fragment>
      {user.isLoading && <LinearProgress style={{position: 'absolute', width: '100%'}}/>}

      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path='/' component={MainScreen}/>
          <Route render={() => <h1>404 page</h1>}/>
        </Switch>
      </BrowserRouter>

    </React.Fragment>
  )
}

const mapStateToProps = ({user}) => ({
  user,
});

// const mapDispatchToProps = dispatch => bindActionCreators({
//   logInUser,
// }, dispatch);

export default connect(mapStateToProps, null)(App);
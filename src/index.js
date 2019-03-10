import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';
import store from './modules/redux-module/store';

import CssBaseline from '@material-ui/core/CssBaseline';
import {MuiThemeProvider} from '@material-ui/core/styles';
import muiTheme from './theme';

import App from './App';

// [TODO] add React.memo
ReactDOM.render(
  <React.Fragment>
    <CssBaseline/>

    <MuiThemeProvider theme={muiTheme}>
      <Provider store={store}>
        <App/>
      </Provider>
    </MuiThemeProvider>
  </React.Fragment>
  , document.getElementById('app'));
import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';
import store from './redux-core/store';

import CssBaseline from '@material-ui/core/CssBaseline';
import {MuiThemeProvider} from '@material-ui/core/styles';
import muiTheme from './theme';

import App from './App';

// // [NOTE] Only keep it for testing reason for creat session on server:
// fetch('http://localhost:8000', {
//   mode: "no-cors", // no-cors, cors, *same-origin
// })
//   .then(response => response.json())
//   .then(response => console.info(response))
//   .catch(err => console.log(err));
// =====================================================


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
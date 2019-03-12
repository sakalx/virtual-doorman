import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {toggleSnackbar} from 'root/redux-core/actions/snackbar';

import Snackbar from '@material-ui/core/Snackbar';

const SnackbarMessage = ({
                           openSnackBar,
                           snackBarMsg,
                           toggleSnackbar,
                         }) => {

  const handleClose = () => {
    toggleSnackbar()
  };

  return (
    <Snackbar
      open={openSnackBar}
      onClose={handleClose}
      autoHideDuration={2000}
      ContentProps={{'aria-describedby': 'snackBar-msg'}}
      message={
        <span id='snackBar-msg'>{snackBarMsg}</span>
      }
    />
  )
};

const mapStateToProps = ({snackbar: {openSnackBar, snackBarMsg}}) => ({
  openSnackBar,
  snackBarMsg,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleSnackbar
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SnackbarMessage);
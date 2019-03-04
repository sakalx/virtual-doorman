import React from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {resolveNotification} from 'root/redux-core/actions/notification';

import Button from '@material-ui/core/Button';


function CloseButton({
                       notification,
                       resolveNotification,
                     }) {

  const handleEndCall = () => {
    resolveNotification();
  };

  return (
    <Button
      variant='outlined'
      color='primary'
      size='small'
      onClick={handleEndCall}
    >
      End Call
    </Button>
  )
}

const mapDispatchToProps = dispatch => bindActionCreators({
  resolveNotification,
}, dispatch);

export default connect(null, mapDispatchToProps)(CloseButton);
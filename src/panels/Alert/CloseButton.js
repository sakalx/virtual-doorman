import React from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {resolveNotification} from 'root/redux-module/actions/notification';

import Button from '@material-ui/core/Button';


function CloseButton({
                       notification,
                       notifications,
                       resolveNotification,
                     }) {

  const handleEndCall = () => {
    resolveNotification(notifications.selected);
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

const mapStateToProps = ({notifications}) => ({
  notifications,
});


const mapDispatchToProps = dispatch => bindActionCreators({
  resolveNotification,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CloseButton);
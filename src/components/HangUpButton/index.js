import React from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {resolveNotification} from 'root/redux-core/actions/notification';

import CallEndIcon from '@material-ui/icons/CallEnd';
import Fab from '@material-ui/core/Fab';


function HangUpButton({
                        resolveNotification,
                        selected,
                        size = 'small',
                        style,
                      }) {

  const handleHangUp = () => {
    resolveNotification();
  };

  return (
    <Fab
      aria-label='Hang-up-phone'
      color='secondary'
      disabled={!selected}
      onClick={handleHangUp}
      size={size}
      style={style}
    >
      <CallEndIcon/>
    </Fab>
  )
}

const mapStateToProps = ({notifications: {selected}}) => ({
  selected,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  resolveNotification,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HangUpButton);
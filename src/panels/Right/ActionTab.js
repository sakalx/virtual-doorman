import React from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {regeneratedNotification} from 'root/redux-core/actions/notification';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import SelectLog from 'root/components/SelectLog';
import AlarmNote from 'root/components/AlarmNote';
import HangUpButton from 'root/components/HangUpButton';

import {
  Row,
  ActionLog,
} from './style';


function ActionTab({
                     regeneratedNotification,
                     notifications,
                   }) {

  const handleRegenerateAlarm = () => {
    regeneratedNotification();
  };

  const isDisabled = !notifications.selected;

  return (
    <div>
      <Row>
        <SelectLog/>
        <Button variant='contained' color='primary'>
          Add
        </Button>
      </Row>

      <AlarmNote/>

      <ActionLog>
        <Typography color='textSecondary' variant='subtitle2'>
          Action logs
        </Typography>
        <Paper style={{width: '100%', height: '100px'}}/>
      </ActionLog>

      <Row>
        <Button
          color='primary'
          disabled={isDisabled}
          size='small'
          variant='contained'
        >
          Update call log
        </Button>
        <Button
          color='primary'
          onClick={handleRegenerateAlarm}
          size='small'
          variant='outlined'
          disabled={isDisabled}
        >
          Regenerate Alarm
        </Button>
        <HangUpButton/>
      </Row>
    </div>
  )
}

const mapStateToProps = ({notifications}) => ({
  notifications,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  regeneratedNotification,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ActionTab);
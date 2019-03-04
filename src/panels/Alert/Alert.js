import React from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {selectBuilding} from 'root/redux-core/actions/building';
import {acceptNotification} from 'root/redux-core/actions/notification';

import time from 'root/utils/time';

import CloseButton from './CloseButton';

import {
  Row,
  Cell,
} from './style';

function Alert({
                 acceptNotification,
                 selected,
                 notification,
                 selectBuilding,
               }) {

  const getDurationCall = () => {
    const durationCall = notification.resolvedCallTime - notification.acceptedCallTime;
    return time.millisToMinutesAndSeconds(durationCall);
  };

  const handleSelectAlert = () => {
    if (selected) return;

    // Post to server updated notification and emit notification-socket
    fetch('http://104.248.110.70:3000/updatenotification', {
      method: 'post',
      body: JSON.stringify(notification),
    });

    acceptNotification(notification.timestamp);
    selectBuilding(notification.building.id);
  };

  //const isSelected = notification.acceptedCallTime > 0 && notification.resolvedCallTime === null;
  const isSelected = selected === notification.timestamp;

  return (
    <Row
      onDoubleClick={handleSelectAlert}
      status={{
        pending: notification.acceptedCallTime === null,
        selected: isSelected,
      }}
    >
      <Cell>{time.normalizeDate(notification.timestamp)}</Cell>
      <Cell>{notification.building.name}</Cell>
      <Cell>{notification.doorStation}</Cell>
      <Cell>{notification.operator.name}</Cell>
      <Cell>{time.normalizeDate(notification.acceptedCallTime)}</Cell>
      <Cell>{getDurationCall()}</Cell>
      <Cell>{notification.alarmType}</Cell>
      <Cell style={{minWidth: 90}}>
        {isSelected && (
          <CloseButton notification={notification}/>
        )}
      </Cell>
    </Row>
  )
}

const mapStateToProps = ({notifications: {selected}}) => ({
  selected,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  acceptNotification,
  selectBuilding,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
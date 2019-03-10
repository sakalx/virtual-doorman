import React from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {selectBuilding} from 'root/redux-module/actions/building';
import {acceptNotification} from 'root/redux-module/actions/notification';

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
    const durationCall = notification.resolved_time - notification.accepted_time;
    return time.millisToMinutesAndSeconds(durationCall);
  };

  const handleSelectAlert = () => {
    if (selected) return;

    acceptNotification(notification.id);
    selectBuilding(notification.building_id);
  };

  const isSelected = notification.accepted_time > 0 && notification.resolved_time === null;

  return (
    <Row
      onDoubleClick={handleSelectAlert}
      status={{
        pending: notification.accepted_time === null,
        selected: isSelected,
      }}
    >
      <Cell>{time.normalizeDate(notification.timestamp)}</Cell>
      <Cell>{notification.building_name}</Cell>
      <Cell>{notification.door_station}</Cell>
      <Cell>{notification.operator_name}</Cell>
      <Cell>{time.normalizeDate(notification.accepted_time)}</Cell>
      <Cell>{getDurationCall()}</Cell>
      <Cell>{notification.alarm_type}</Cell>
      <Cell style={{minWidth: 90}}>
        {selected === notification.id && (
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
import React, {useEffect} from 'react';

import socket from 'root/api/getSocket';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getBuildingData} from 'root/redux-core/actions/building';
import {getOperatorsInfo} from 'root/redux-core/actions/operator';
import {setNotification} from 'root/redux-core/actions/notification';

import useSocketOn from 'root/hooks/useSocketOn';

import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';

import NavigationPanel from 'root/panels/Navigation';
import LeftPanel from 'root/panels/Left';
import MiddlePanel from 'root/panels/Middle';
import RightPanel from 'root/panels/Right';
import AlertPanel from 'root/panels/Alert';

import {
  Row,
  MainSection,
} from './style';

function MainScreen({
                      getBuildingData,
                      getOperatorsInfo,
                      setNotification,
                    }) {

  useEffect(() => {
    // COLLECT DATA
    getBuildingData();
    getOperatorsInfo();
  }, []);

  // Listening notification-socket
  useSocketOn('notification', _setNotification);

  const handleAddNewNotification = () => {
    const newDummyNotification = _createTestNotification();
    socket.emit('add notification', newDummyNotification);
  };

  function _createTestNotification() {
    const uuidv4 = () =>
      ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      );

    const dummyNotification = {
      id: uuidv4(),
      accepted_time: null,
      alarm_type: 'VDM CALL',
      building_id: 165,
      building_name: 'Building 003 - 82 Irving Place',
      door_station: 'front door',
      operator_id: 120,
      operator_name: 'mandrewso',
      resolved_time: null,
      timestamp: String(+new Date()),
    };

    return dummyNotification;
  }

  function _setNotification(data) {
    setNotification(data);
  }

  return (
    <main>

      <Button color='secondary' onClick={handleAddNewNotification}>
        Add new notification
      </Button>

      <Slide direction='right' in={true} mountOnEnter>
        <NavigationPanel/>
      </Slide>

      <Slide direction='up' in={true} mountOnEnter>
        <Row>
          <LeftPanel/>
          <MainSection>
            {/*inline style temporary only for visualisation layout*/}
            <Row style={{minHeight: '500px'}}>
              <MiddlePanel/>
              <RightPanel/>
            </Row>
            <AlertPanel/>
          </MainSection>
        </Row>
      </Slide>

    </main>
  )
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getBuildingData,
  getOperatorsInfo,
  setNotification,
}, dispatch);

export default connect(null, mapDispatchToProps)(MainScreen);
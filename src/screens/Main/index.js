import React, {useEffect} from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getBuildingData} from 'root/redux-core/actions/building';
import {getOperatorsInfo} from 'root/redux-core/actions/operator';
import {setNewNotification} from 'root/redux-core/actions/notification';

import useSocket from 'root/hooks/useSocket';
import {notificationSocketURL} from 'root/api/sockets';

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
                      setNewNotification,
                    }) {

  useEffect(() => {
    // COLLECT DATA
    getBuildingData();
    getOperatorsInfo();

    // Dummy: Post to server new notification and emit notification-socket
    fetch('http://104.248.110.70:3000/newnotification', {
      method: 'post',
      body: _createTestNotification(),
    });
    console.log(_createTestNotification());
  }, []);


/*  app.post('/notification', function (req, res) {
    const notification = JSON.parse(req.body);
    const id = notification.id;
    notificationDB[id] = newNotification;

    io.sockets.emit('notification', notificationDB);
    res.sendStatus(200);
  });
  */


  // Listening notification-socket
  useSocket({
    url: notificationSocketURL,
    eventKey: 'notification',
    callback: _addNewNotification,
  });

  function _createTestNotification() {
    const uuidv4 = () =>
      ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      );

    const dummyNotification = {
      id: uuidv4(),
      acceptedCallTime: null, //attended
      alarmType: 'VDM CALL',
      building: {
        id: 165,
        name: 'Building 003 - 82 Irving Place',
      },
      doorStation: 'front door',
      operator: {
        id: 120,
        name: 'mandrewso',
      },
      resolvedCallTime: null,
      timestamp: +new Date(),
    };

    return dummyNotification;
  }

  function _addNewNotification(data) {
    console.log('Socket alerts', data);
    //setNewNotification(data);
  }

  return (
    <main>

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
  setNewNotification,
}, dispatch);

export default connect(null, mapDispatchToProps)(MainScreen);
import React, {useEffect} from 'react';

import eventNames from 'root/api/socket-core/eventNames';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getBuildingData} from 'root/redux-core/actions/building';
import {setLoggedUser, setUsers} from 'root/redux-core/actions/users';
import {setNotification} from 'root/redux-core/actions/notification';

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
                      setLoggedUser,
                      setNotification,
                      setUsers,
                      socket,
                    }) {

  useEffect(() => {
    const _setNotification = notification => setNotification(notification);
    const _setUsers = users => setUsers(users);
    const _setCurrentUser = userId => setLoggedUser(userId);

    // COLLECT DATA
    // API
    //getBuildingData();
    // SOCKETS
    socket.Client.on(eventNames.users, _setUsers);
    socket.Client.on(eventNames.notifications, _setNotification);
    socket.Client.on(eventNames.currentUser, _setCurrentUser);

    return () => {
      socket.Client.removeListener(eventNames.users, _setUsers);
      socket.Client.removeListener(eventNames.notifications, _setNotification);
      socket.Client.removeListener(eventNames.currentUser, _setCurrentUser);
    };
  }, []);

  const handleAddNewNotification = () => {
    const newDummyNotification = _createTestNotification();
    socket.Client.emit(eventNames.newNotification, newDummyNotification);
  };

  function _createTestNotification() {
    const uuidv4 = () =>
      ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
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

const mapStateToProps = ({socket}) => ({
  socket,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getBuildingData,
  setLoggedUser,
  setNotification,
  setUsers,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
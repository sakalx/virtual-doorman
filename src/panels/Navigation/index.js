import React from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {logOutUser} from 'root/redux-core/actions/auth';

import Button from '@material-ui/core/Button';

import {
  Container,
  NavigationContainer,
} from './style';


function NavigationPanel({logOutUser}) {
  return (
    <Container component={'nav'} square={true} elevation={1}>
      <NavigationContainer>
        <Button color={'primary'}>Home</Button>
        <Button color={'primary'}>Admin</Button>
        <Button color={'primary'}>Play</Button>
        <Button color={'primary'}>View</Button>
        <Button color={'primary'}>Call</Button>
        <Button color={'primary'}>Options</Button>
        <Button color={'primary'}>Alarm monitoring</Button>
        <Button color={'primary'}>Help</Button>
      </NavigationContainer>

      <Button color={'primary'} onClick={logOutUser}>Logout</Button>
    </Container>
  )
}

const mapDispatchToProps = dispatch => bindActionCreators({
  logOutUser,
}, dispatch);

export default connect(null, mapDispatchToProps)(NavigationPanel);
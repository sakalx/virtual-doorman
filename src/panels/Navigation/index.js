import React from 'react';

import {connect} from 'react-redux';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import {
  Container,
  NavigationContainer,
} from './style';


function NavigationPanel({socket, users}) {

  const logout = () => socket.Client.disconnect();

  return (
    <Container component={'nav'} square={true} elevation={1}>
      <NavigationContainer>
        <Button color={'primary'}>Home</Button>
        <Button color={'primary'}>Play</Button>
        <Button color={'primary'}>View</Button>
        <Button color={'primary'}>Call</Button>
        <Button color={'primary'}>Options</Button>
        <Button color={'primary'}>Alarm monitoring</Button>
        <Button color={'primary'}>Help</Button>
      </NavigationContainer>

      <Typography
        color='secondary'
        component='h3'
        style={{padding: '5px 12px'}}
        variant='button'
      >
        {users.currentUser.name}
      </Typography>

      <Button color={'primary'} onClick={logout}>Logout</Button>
    </Container>
  )
}

const mapStateToProps = ({socket, users}) => ({
  socket,
  users,
});

export default connect(mapStateToProps, null)(NavigationPanel);
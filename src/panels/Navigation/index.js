import React from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import {
  Container,
  NavigationContainer,
} from './style';


function NavigationPanel({user, logOutUser}) {
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

      <Typography
        color='secondary'
        component='h3'
        style={{padding: '5px 12px'}}
        variant='button'
      >
        {user.LOGIN_NAME}
      </Typography>

      <Button color={'primary'} onClick={logOutUser}>Logout</Button>
    </Container>
  )
}

const mapStateToProps = ({auth: {user}}) => ({
  user,
});

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NavigationPanel);
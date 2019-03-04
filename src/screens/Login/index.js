import React from 'react';

import Button from '@material-ui/core/Button';
import SvgIcon from '@material-ui/core/SvgIcon';
import Typography from '@material-ui/core/Typography';

import LoginForm from './LoginForm';

import {fingerPressingRingButton} from 'root/static/icons';

import {
  Container,
  TitleContainer,
  Title,
  LoginContainer,
  LoginTitleContainer, FormContainer,
} from './style';


function LoginScreen() {
  return (
    <Container>
      <TitleContainer>
        <Title variant='h4' gutterBottom={true}>
          Master View Controller (MVC) v.0.0.2f
        </Title>
        <Title variant='h6' gutterBottom={true}>
          VDM oMVC 0.0.1d
        </Title>
      </TitleContainer>

      <LoginContainer elevation={24}>

        <LoginTitleContainer>
          <Typography color='textSecondary' variant='h3'>
            Login
          </Typography>
          <SvgIcon viewBox='0 0 500 500' color='action' fontSize='large'>
            <path d={fingerPressingRingButton}/>
          </SvgIcon>
        </LoginTitleContainer>

        <LoginForm/>
      </LoginContainer>
    </Container>
  )
}

export default LoginScreen;
import React, {useState} from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {logInUser, onLoadingAuth} from 'root/redux-core/actions/auth';

import sigIn from 'root/api/sigIn';

import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import TextField from '@material-ui/core/TextField';

import {
  FormContainer,
} from './style';

function LoginForm({logInUser, onLoadingAuth}) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleChangeName = ({target}) => {
    setName(target.value)
  };

  const handleChangePassword = ({target}) => {
    setPassword(target.value)
  };

  const handleLogin = () => {
    onLoadingAuth(true);

    sigIn(name, password)
      .then(user => {
        user
          ? logInUser(user)
          : setError(true);
      })
      .finally(() => onLoadingAuth(false))
  };

  return (
    <React.Fragment>
      <FormContainer>
        <TextField
          autoComplete='username'
          autoFocus
          error={error}
          fullWidth
          label='Name'
          name='name'
          onChange={handleChangeName}
          value={name}
        />
        <TextField
          autoComplete='current-password'
          error={error}
          fullWidth
          label='Password'
          onChange={handleChangePassword}
          type='password'
          value={password}
        />
      </FormContainer>

      <Collapse in={Boolean(name.length > 3)} style={{width: '100%'}}>
        <Button
          color='primary'
          fullWidth
          onClick={handleLogin}
          variant='outlined'
        >
          Login
        </Button>
      </Collapse>
    </React.Fragment>
  )
}


const mapDispatchToProps = dispatch => bindActionCreators({
  logInUser,
  onLoadingAuth,
}, dispatch);

export default connect(null, mapDispatchToProps)(LoginForm);
import React, {useState} from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {logInUser, onLoadingUser} from 'root/redux-core/actions/user';

import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import TextField from '@material-ui/core/TextField';

import {
  FormContainer,
} from './style';

function LoginForm({logInUser, onLoadingUser}) {
  const [name, setName] = useState('sakals@mail.ua');
  const [password, setPassword] = useState('666666');
  const [error, setError] = useState(false);

  const handleChangeName = ({target}) => {
    setName(target.value)
  };

  const handleChangePassword = ({target}) => {
    setPassword(target.value)
  };

  const handleLogin = () => {
    onLoadingUser(true);

    signInWithEmail(name, password)
      .catch(err => {
        console.info(err);
        setError(true);
      })
      .finally(() => onLoadingUser(false))
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
  onLoadingUser,
}, dispatch);

export default connect(null, mapDispatchToProps)(LoginForm);
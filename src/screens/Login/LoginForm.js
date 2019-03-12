import React, {useState} from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {connectUser} from 'root/redux-core/actions/socket';

import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import TextField from '@material-ui/core/TextField';

import {
  FormContainer,
} from './style';


function LoginForm({socket, connectUser}) {
  const [name, setName] = useState('erik');
  const [password, setPassword] = useState('7777777');
  const [error, setError] = useState(false);


  const handleChangeName = ({target}) => {
    setName(target.value)
  };

  const handleChangePassword = ({target}) => {
    setPassword(target.value)
  };

  const handleLogin = () => {
    const userAccess = JSON.stringify({name, password});
    connectUser(userAccess);

    if (socket.error) setError(true);
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

const mapStateToProps = ({socket}) => ({
  socket,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  connectUser,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
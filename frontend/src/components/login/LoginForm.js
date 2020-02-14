import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { newLogin } from '../../actions/loginActions';
import { setNotification } from '../../reducers/notificationReducer';
import Notification from '../layout/Notification';

// eslint-disable-next-line no-shadow
const LoginForm = ({ newLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // handle login redux
  const handleLogin = async event => {
    event.preventDefault();
    const user = {
      username,
      password
    };
    newLogin(user);
  };
  return (
    <div>
      <h1>RADIO HELSINKI - TEOSTORAPORTOINTI</h1>
      <h3>Kirjaudu sisään</h3>
      <Notification />
      <Form onSubmit={handleLogin}>
        <Form.Field>
          <label>Käyttäjätunnus</label>
          <input
            type='text'
            placeholder='Käyttäjätunnus...'
            onChange={e => setUsername(e.target.value.trim())}
          />
        </Form.Field>
        <Form.Field>
          <label>Salasana</label>
          <input
            type='password'
            placeholder='Salasana...'
            onChange={e => setPassword(e.target.value.trim())}
          />
        </Form.Field>
        <Button color='green' type='submit'>
          Kirjaudu
        </Button>
      </Form>
    </div>
  );
};

LoginForm.propTypes = {
  newLogin: PropTypes.func.isRequired
};

export default connect(null, { newLogin, setNotification })(LoginForm);

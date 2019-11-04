import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Notification from '../layout/Notification';
import { Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { newLogin } from '../../actions/loginActions';
import { setNotification } from '../../reducers/notificationReducer';

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
    console.log(user);
    newLogin(user);
  };
  return (
    <div>
      <Notification />
      <Form onSubmit={handleLogin}>
        <Form.Field>
          <label>Käyttäjätunnus</label>
          <input
            type="text"
            placeholder="Käyttäjätunnus..."
            onChange={e => setUsername(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Salasana</label>
          <input
            type="password"
            placeholder="Salasana..."
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Field>
        <Button color="green" type="submit">
          Kirjaudu
        </Button>
      </Form>
    </div>
  );
};

LoginForm.propTypes = {
  newLogin: PropTypes.func.isRequired
};

export default connect(
  null,
  { newLogin, setNotification }
)(LoginForm);

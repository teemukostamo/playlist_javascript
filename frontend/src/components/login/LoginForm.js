import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { newLogin } from '../../actions/loginActions';
import { showNotificationWithTimeout } from '../../reducers/notificationReducer';

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

    const errorNotification = showNotificationWithTimeout;
    newLogin(user, errorNotification);
  };
  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          placeholder="Käyttäjätunnus..."
          onChange={e => setUsername(e.target.value)}
        />
        <input
          placeholder="Salasana..."
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Kirjaudu</button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  newLogin: PropTypes.func.isRequired
};

export default connect(
  null,
  { newLogin, showNotificationWithTimeout }
)(LoginForm);

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useField } from './hooks';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import UserList from './components/UserList';
import ReportList from './components/ReportList';
import LoginForm from './components/forms/LoginForm';
import Notification from './components/Notification';

import { initializeUsers } from './reducers/userReducer';
import { initializeUser, newLogin, logout } from './reducers/loginReducer';
import { getOneReport } from './reducers/reportReducer';
import { showNotificationWithTimeout } from './reducers/notificationReducer';

const App = props => {
  const [userList, setUserList] = useState([]);
  const username = useField('text');
  const password = useField('password');
  const [errorMessage, setErrorMessage] = useState(null);

  // initial logged in user
  useEffect(() => {
    props.initializeUser();
  }, []);

  // initial users list
  useEffect(() => {
    props.initializeUsers();
  }, []);

  // handle login redux
  const handleLogin = async event => {
    event.preventDefault();
    console.log(username.attributes);
    const user = {
      username: username.attributes.value,
      password: password.attributes.value
    };
    const errorNotification = props.showNotificationWithTimeout;
    props.newLogin(user, errorNotification);
  };

  // handle logout redux
  const handleLogout = () => {
    props.logout();
  };

  console.log('app 74', props);
  if (props.login.user === null) {
    return (
      <div>
        <h2>Login to system</h2>
        <Notification message={errorMessage} />
        <LoginForm
          username={username.attributes}
          password={password.attributes}
          onSubmit={handleLogin}
        />
      </div>
    );
  }
  console.log(userList);
  return (
    <div>
      Logged in as {props.login.username}
      <button onClick={handleLogout}>logout</button>
      <ReportList />
      <UserList />
    </div>
  );
};

const mapStateToProps = state => {
  console.log('app state', state);
  return {
    login: state.login,
    users: state.users
  };
};

const mapDispatchToProps = {
  showNotificationWithTimeout,
  initializeUser,
  newLogin,
  logout,
  initializeUsers,
  getOneReport
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

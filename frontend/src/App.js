import React, { useState, useEffect } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import UserList from './components/user/UserList';
import ReportList from './components/report/ReportList';
import LoginForm from './components/login/LoginForm';
import Notification from './components/layout/Notification';

import { initializeUsers } from './reducers/userReducer';
import { initializeUser, newLogin, logout } from './reducers/loginReducer';
import { getOneReport } from './reducers/reportReducer';
import { showNotificationWithTimeout } from './reducers/notificationReducer';

const App = props => {
  const [userList, setUserList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    // initializes MaterializeJS
    M.AutoInit();
  });

  // initial logged in user
  useEffect(() => {
    props.initializeUser();
  }, []);

  // initial users list
  useEffect(() => {
    props.initializeUsers();
  }, []);

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
        <LoginForm />
      </div>
    );
  }
  console.log(userList);
  return (
    <div className="container">
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

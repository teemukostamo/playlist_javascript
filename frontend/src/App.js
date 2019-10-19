import React, { Fragment, useState, useEffect } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import UserList from './components/user/UserList';
import ReportList from './components/report/ReportList';
import LoginForm from './components/login/LoginForm';
import Navbar from './components/layout/Navbar';

import { initializeUser, logout } from './actions/loginActions';

const App = props => {
  // initializes MaterializeJS
  useEffect(() => {
    M.AutoInit();
  });

  // initial logged in user
  useEffect(() => {
    props.initializeUser();
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
        <LoginForm />
      </div>
    );
  }
  return (
    <Fragment>
      <Navbar />
      <div className="container">
        Logged in as {props.login.username}
        <button onClick={handleLogout}>logout</button>
        <ReportList />
        <UserList />
      </div>
    </Fragment>
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
  initializeUser,
  logout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

import React, { useEffect } from 'react';
// import 'materialize-css/dist/css/materialize.min.css';
// import M from 'materialize-css/dist/js/materialize.min.js';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
// import './App.css';

import Home from './components/layout/Home';
import UserList from './components/user/UserList';
import ReportList from './components/report/ReportList';
import LoginForm from './components/login/LoginForm';
import { Container, Menu } from 'semantic-ui-react';

import { initializeUser, logout } from './actions/loginActions';
import ReportWithTracks from './components/report/ReportWithTracks';

const App = props => {
  // initial logged in user
  useEffect(() => {
    props.initializeUser();
    // eslint-disable-next-line
  }, []);

  // handle logout redux
  const handleLogout = () => {
    props.logout();
  };

  console.log('app 74', props);
  if (props.login.user === null) {
    return (
      <Container>
        <LoginForm />
      </Container>
    );
  }
  return (
    <Router>
      <div>
        Logged in as {props.login.username}
        <button onClick={handleLogout}>logout</button>
        <Menu inverted>
          <Menu.Item link>
            <Link to="/">Etusivu</Link>
          </Menu.Item>
          <Menu.Item link>
            <Link to="/reports">Raportit</Link>
          </Menu.Item>
          <Menu.Item link>
            <Link to="/">Top 100</Link>
          </Menu.Item>
          <Menu.Item link>
            <Link to="/">Haku</Link>
          </Menu.Item>
          <Menu.Item link>
            <Link to="/users">Käyttäjät</Link>
          </Menu.Item>
          <Menu.Item link>
            <Link to="/">Ohjelmat</Link>
          </Menu.Item>
          <Menu.Item link>
            <Link to="/">Omat tiedot</Link>
          </Menu.Item>
        </Menu>
      </div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/reports" component={ReportList} />
        <Route
          path="/reports/:id"
          render={({ match }) => {
            console.log('*');
            return <ReportWithTracks id={match.params.id} />;
          }}
        />
        <Route exact path="/users" component={UserList} />
      </Switch>
    </Router>
  );
};

const mapStateToProps = state => {
  console.log('app state', state);
  return {
    reportsList: state.reportsList,
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

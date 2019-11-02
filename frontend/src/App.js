import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
// import './App.css';
import Navbar from './components/layout/Navbar';
import Home from './components/layout/Home';
import UserList from './components/user/UserList';
import ReportList from './components/report/ReportList';
import LoginForm from './components/login/LoginForm';
import ReportTransferList from './components/report/ReportTransferList';
import { Container } from 'semantic-ui-react';

import { initializeUser, logout } from './actions/loginActions';
import { initializeUsers } from './actions/userActions';
import { initializePrograms } from './actions/programActions';
import ReportWithTracks from './components/report/ReportWithTracks';

const App = props => {
  // initial logged in user, programs list, users list
  useEffect(() => {
    props.initializeUser();
    props.initializePrograms();
    props.initializeUsers();
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
        <Navbar />
      </div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/reports" component={ReportList} />
        <Route exact path="/transfer" component={ReportTransferList} />
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
    users: state.users,
    programs: state.programs
  };
};

const mapDispatchToProps = {
  initializeUser,
  logout,
  initializePrograms,
  initializeUsers
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

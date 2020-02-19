import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';
import { Container } from 'semantic-ui-react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './components/layout/Home';
import UserList from './components/user/UserList';
import ReportList from './components/report/ReportList';
import ProgramList from './components/program/ProgramList';
import ArtistDetails from './components/artist/ArtistDetails';
import AlbumDetails from './components/album/AlbumDetails';
import TrackDetails from './components/track/TrackDetails';
import LoginForm from './components/login/LoginForm';
import ReportTransferList from './components/report/ReportTransferList';
import Search from './components/search/Search';
import Top100List from './components/top100/Top100List';
import ReportWithTracks from './components/report/ReportWithTracks';
import Notification from './components/layout/Notification';
import { initializeUser } from './actions/loginActions';
import { initializeUsers } from './actions/userActions';
import { initializePrograms } from './actions/programActions';

const App = ({
  login,
  initializeProgramsConnect,
  initializeUserConnect,
  initializeUsersConnect
}) => {
  // initial logged in user, programs list, users list
  useEffect(() => {
    initializeUserConnect();
    initializeProgramsConnect();
    initializeUsersConnect();
    // eslint-disable-next-line
  }, [login.token]);

  if (login.user === null) {
    return (
      <Container>
        <LoginForm />
      </Container>
    );
  }
  if (login.status === null) {
    return (
      <Container>
        <div>Tunnukset hyllyllä. Ota yhteys ylläpitoon.</div>
        <LoginForm />
      </Container>
    );
  }

  // return dj

  // return toimitus

  // return admin
  return (
    <Router>
      <div>
        {/* Logged in as {login.username}
        <button onClick={handleLogout}>logout</button> */}
        <Navbar first_name={login.first_name} last_name={login.last_name} />
      </div>
      <div>
        <Notification />
      </div>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/reports' component={ReportList} />
        <Route exact path='/transfer' component={ReportTransferList} />
        <Route
          path='/reports/:id'
          render={({ match }) => {
            return <ReportWithTracks id={match.params.id} />;
          }}
        />
        <Route
          path='/artist/:id'
          render={({ match }) => {
            return <ArtistDetails id={match.params.id} />;
          }}
        />
        <Route
          path='/album/:id'
          render={({ match }) => {
            return <AlbumDetails id={match.params.id} />;
          }}
        />
        <Route
          path='/track/:id'
          render={({ match }) => {
            return <TrackDetails id={match.params.id} />;
          }}
        />
        <Route exact path='/programs' component={ProgramList} />
        <Route exact path='/search' component={Search} />
        <Route exact path='/top100' component={Top100List} />
        <Route exact path='/users' component={UserList} />
      </Switch>
      <div>
        <Footer />
      </div>
    </Router>
  );
};

App.propTypes = {
  // login: PropTypes.shape({
  //   user: PropTypes.shape,
  //   first_name: PropTypes.string,
  //   last_name: PropTypes.string,
  //   email: PropTypes.string,
  //   id: PropTypes.number,
  //   level: PropTypes.number,
  //   loading: PropTypes.bool,
  //   status: PropTypes.number,
  //   token: PropTypes.string,
  //   username: PropTypes.string
  // }),
  login: PropTypes.objectOf(PropTypes.any),
  initializeUserConnect: PropTypes.func,
  initializeUsersConnect: PropTypes.func,
  initializeProgramsConnect: PropTypes.func
};

const mapStateToProps = state => {
  return {
    report: state.report,
    reportsList: state.reportsList,
    login: state.login,
    users: state.users,
    programs: state.programs
  };
};

const mapDispatchToProps = {
  initializeUserConnect: initializeUser,
  initializeProgramsConnect: initializePrograms,
  initializeUsersConnect: initializeUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

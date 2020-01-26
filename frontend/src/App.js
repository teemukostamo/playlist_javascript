import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';
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
import { Container } from 'semantic-ui-react';
import { initializeUser, logout } from './actions/loginActions';
import { initializeUsers } from './actions/userActions';
import { initializePrograms } from './actions/programActions';

const App = props => {
  // initial logged in user, programs list, users list
  useEffect(() => {
    props.initializeUser();
    props.initializePrograms();
    props.initializeUsers();
    // eslint-disable-next-line
  }, [props.login.token]);

  console.log('app 74', props);
  if (props.login.user === null) {
    return (
      <Container>
        <LoginForm />
      </Container>
    );
  }
  if (props.login.status === null) {
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
        {/* Logged in as {props.login.username}
        <button onClick={handleLogout}>logout</button> */}
        <Navbar
          first_name={props.login.first_name}
          last_name={props.login.last_name}
        />
      </div>
      <div>
        <Notification />
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
        <Route
          path="/artist/:id"
          render={({ match }) => {
            console.log('*');
            return <ArtistDetails id={match.params.id} />;
          }}
        />
        <Route
          path="/album/:id"
          render={({ match }) => {
            console.log('*');
            return <AlbumDetails id={match.params.id} />;
          }}
        />
        <Route
          path="/track/:id"
          render={({ match }) => {
            console.log('*');
            return <TrackDetails id={match.params.id} />;
          }}
        />
        <Route exact path="/programs" component={ProgramList} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/top100" component={Top100List} />
        <Route exact path="/users" component={UserList} />
      </Switch>
      <div>
        <Footer />
      </div>
    </Router>
  );
};

const mapStateToProps = state => {
  console.log('app state', state);
  return {
    report: state.report,
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

export default connect(mapStateToProps, mapDispatchToProps)(App);

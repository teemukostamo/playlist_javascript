import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  withRouter,
  matchPath
} from 'react-router-dom';
import User from './User';
import Preloader from '../layout/Preloader';
import { showNotificationWithTimeout } from '../../reducers/notificationReducer';
import { initializeUsers } from '../../actions/userActions';

const UserList = props => {
  // initial users list
  useEffect(() => {
    props.initializeUsers();
  }, []);

  if (props.users.error) {
    return (
      <div>
        <h4>no users</h4>
      </div>
    );
  }

  console.log('userlist props', props);
  return (
    <div>
      <h2>userlist</h2>
      <table className="striped">
        <thead>
          <tr>
            <td>Käyttäjätunnus</td>
            <td>Nimi</td>
            <td>Viimeisin kirjautuminen</td>
            <td>Taso</td>
          </tr>
        </thead>

        <tbody>
          {props.users === [] ? (
            <tr className="center">
              <td>No users to show</td>
            </tr>
          ) : (
            props.users.map(user => <User user={user} key={user.id} />)
          )}
        </tbody>
      </table>
    </div>
  );
};

const mapDispatchToProps = {
  showNotificationWithTimeout,
  initializeUsers
};

const mapStateToProps = state => ({
  users: state.users,
  login: state.login
});

const connectedUserList = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserList);

export default connectedUserList;

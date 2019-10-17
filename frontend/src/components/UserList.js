import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import User from './User';

const UserList = props => {
  console.log('userlist props', props);
  return (
    <div>
      <h2>userlist</h2>
      <table>
        <thead>
          <tr>
            <td>Käyttäjätunnus</td>
            <td>Nimi</td>
            <td>Viimeisin kirjautuminen</td>
            <td>Taso</td>
          </tr>
        </thead>

        <User />
      </table>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  console.log('userlist own props', ownProps);
  return {
    users: state.users
  };
};

const connectedUserList = connect(mapStateToProps)(UserList);

export default connectedUserList;

import React from 'react';
import { connect } from 'react-redux';

const User = props => {
  console.log('user props', props);
  return (
    <tbody>
      {props.users.map(user => (
        <tr key={user.id}>
          <td>{user.username}</td>
          <td>
            {user.first_name} {user.last_name}
          </td>
          <td>{user.last_seen}</td>
          <td>{user.level}</td>
        </tr>
      ))}
    </tbody>
  );
};

const mapStateToProps = state => {
  console.log('user state', state);
  return {
    users: state.users,
    login: state.login
  };
};

const connectedUser = connect(mapStateToProps)(User);

export default connectedUser;

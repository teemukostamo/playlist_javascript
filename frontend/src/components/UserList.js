import React from 'react';
import User from './User';

const UserList = ({ userList }) => {
  console.log(userList);
  return (
    <div>
      <h1>userlist</h1>
      <table>
        <thead>
          <tr>
            <td>Käyttäjätunnus</td>
            <td>Nimi</td>
            <td>Viimeisin kirjautuminen</td>
            <td>Taso</td>
          </tr>
        </thead>

        <User userList={userList} />
      </table>
    </div>
  );
};

export default UserList;

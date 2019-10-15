import React from 'react';

const User = ({ userList }) => {
  console.log(userList);
  return (
    <tbody>
      {userList.map(user => (
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

export default User;

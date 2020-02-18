import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { Table, Icon, Confirm } from 'semantic-ui-react';
import EditUserModal from './EditUserModal';
import { setNotification } from '../../reducers/notificationReducer';
import { setCurrent, updateUser, deleteUser } from '../../actions/userActions';

const UserListItem = ({ user, deleteUser, setNotification }) => {
  const [open, setOpen] = useState(false);

  let userLevelOutPrint;
  if (user.level === 1) {
    userLevelOutPrint = 'DJ';
  } else if (user.level === 2) {
    userLevelOutPrint = 'Toimitus';
  } else {
    userLevelOutPrint = 'Admin';
  }

  let className;
  let userStatusOutPrint;
  if (user.status === null) {
    userStatusOutPrint = 'Hyllyllä';
    className = 'inactive-user';
  } else if (user.status === 1) {
    userStatusOutPrint = 'Käytössä';
    className = 'active-user';
  }

  const cancelDelete = () => {
    setOpen(false);
  };
  const confirmDelete = () => {
    setOpen(false);
    deleteUser(user.id);
    setNotification(`Käyttäjä ${user.username} poistettu!`, 'success');
  };

  return (
    <Table.Row>
      <Table.Cell>
        <EditUserModal user={user} />
      </Table.Cell>
      <Table.Cell>
        {user.first_name} {user.last_name}
      </Table.Cell>
      <Table.Cell>
        <Moment format='MMMM Do YYYY, h:mm:ss a'>{user.last_seen}</Moment>
      </Table.Cell>
      <Table.Cell className={className}>{userStatusOutPrint}</Table.Cell>
      <Table.Cell>{userLevelOutPrint}</Table.Cell>
      <Table.Cell>
        <Icon color='red' onClick={() => setOpen(true)} name='delete' />
        <Confirm
          content={`Haluatko varmasti poistaa käyttäjän ${user.username}?`}
          open={open}
          onCancel={cancelDelete}
          onConfirm={confirmDelete}
          cancelButton='En sittenkään'
          confirmButton='Joo kyl'
        />
      </Table.Cell>
    </Table.Row>
  );
};

UserListItem.propTypes = {
  user: PropTypes.shape({
    address: PropTypes.string,
    city: PropTypes.string,
    country: PropTypes.string,
    created_at: PropTypes.string,
    email: PropTypes.string,
    first_name: PropTypes.string,
    id: PropTypes.number,
    last_name: PropTypes.string,
    last_seen: PropTypes.string,
    level: PropTypes.number,
    old_id: PropTypes.number,
    phone: PropTypes.string,
    reset_key: PropTypes.string,
    status: PropTypes.number,
    updated_at: PropTypes.string,
    username: PropTypes.string,
    zip: PropTypes.string
  }),
  deleteUser: PropTypes.func,
  setNotification: PropTypes.func
};

const mapDispatchToProps = {
  setCurrent,
  setNotification,
  updateUser,
  deleteUser
};

const connectedUser = connect(null, mapDispatchToProps)(UserListItem);

export default connectedUser;

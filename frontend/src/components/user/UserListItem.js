import React, { useState } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import EditUserModal from './EditUserModal';
import { setNotification } from '../../reducers/notificationReducer';
import { setCurrent, updateUser, deleteUser } from '../../actions/userActions';
import { Table, Icon, Confirm } from 'semantic-ui-react';

const UserListItem = props => {
  const [open, setOpen] = useState(false);

  let userLevelOutPrint;
  if (props.user.level === 1) {
    userLevelOutPrint = 'DJ';
  } else if (props.user.level === 2) {
    userLevelOutPrint = 'Toimitus';
  } else {
    userLevelOutPrint = 'Admin';
  }

  let className;
  let userStatusOutPrint;
  if (props.user.status === null) {
    userStatusOutPrint = 'Hyllyllä';
    className = 'inactive-user';
  } else if (props.user.status === 1) {
    userStatusOutPrint = 'Käytössä';
    className = 'active-user';
  }

  const cancelDelete = () => {
    setOpen(false);
  };
  const confirmDelete = () => {
    setOpen(false);
    props.deleteUser(props.user.id);
    console.log('deleting user', props.user.id);
    props.setNotification(
      `Käyttäjä ${props.user.username} poistettu!`,
      'success'
    );
  };

  return (
    <Table.Row>
      <Table.Cell>
        <EditUserModal user={props.user} />
      </Table.Cell>
      <Table.Cell>
        {props.user.first_name} {props.user.last_name}
      </Table.Cell>
      <Table.Cell>
        <Moment format="MMMM Do YYYY, h:mm:ss a">{props.user.last_seen}</Moment>
      </Table.Cell>
      <Table.Cell className={className}>{userStatusOutPrint}</Table.Cell>
      <Table.Cell>{userLevelOutPrint}</Table.Cell>
      <Table.Cell>
        <Icon color="red" onClick={() => setOpen(true)} name="delete" />
        <Confirm
          content={`Haluatko varmasti poistaa käyttäjän ${props.user.username}?`}
          open={open}
          onCancel={cancelDelete}
          onConfirm={confirmDelete}
          cancelButton="En sittenkään"
          confirmButton="Joo kyl"
        />
      </Table.Cell>
    </Table.Row>
  );
};

const mapDispatchToProps = {
  setCurrent,
  setNotification,
  updateUser,
  deleteUser
};

const connectedUser = connect(null, mapDispatchToProps)(UserListItem);

export default connectedUser;

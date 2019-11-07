import React from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import EditUserModal from './EditUserModal';
import { setNotification } from '../../reducers/notificationReducer';
import { setCurrent, updateUser } from '../../actions/userActions';
import { Table, Icon } from 'semantic-ui-react';

const UserListItem = props => {
  const onDelete = () => {
    console.log(`klikd delete on user ${props.user.id}`);
  };

  let userLevelOutPrint;
  if (props.user.level === 1) {
    userLevelOutPrint = 'DJ';
  } else if (props.user.level === 2) {
    userLevelOutPrint = 'Toimitus';
  } else {
    userLevelOutPrint = 'Admin';
  }

  let userStatusOutPrint;
  if (props.user.status === null) {
    userStatusOutPrint = 'Hyllyllä';
  } else if (props.user.status === 1) {
    userStatusOutPrint = 'Käytössä';
  }

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
      <Table.Cell>{userStatusOutPrint}</Table.Cell>
      <Table.Cell>{userLevelOutPrint}</Table.Cell>
      <Table.Cell>
        <Icon color="red" onClick={onDelete} name="delete" />
      </Table.Cell>
    </Table.Row>
  );
};

const mapDispatchToProps = {
  setCurrent,
  setNotification,
  updateUser
};

const connectedUser = connect(
  null,
  mapDispatchToProps
)(UserListItem);

export default connectedUser;

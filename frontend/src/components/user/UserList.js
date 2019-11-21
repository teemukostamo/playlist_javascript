import React from 'react';
import { connect } from 'react-redux';
import AddUserModal from './AddUserModal';
import User from './UserListItem';
import Notification from '../layout/Notification';
import { Container, Dimmer, Loader } from 'semantic-ui-react';
import { Table } from 'semantic-ui-react';

const UserList = props => {
  if (props.users.users === null || props.users.loading === true) {
    return (
      <Container>
        <Dimmer active inverted>
          <Loader size="medium">Haetaan käyttäjiä...</Loader>
        </Dimmer>
      </Container>
    );
  }

  console.log('userlist props', props);
  if (props.login.level === 3) {
    return (
      <Container>
        <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
          <h3 style={{ display: 'inline' }}>Käyttäjät</h3>
          <AddUserModal />
        </div>
        <Notification />
        <Table striped>
          <Table.Header>
            <Table.Row>
              <Table.Cell>Käyttäjätunnus</Table.Cell>
              <Table.Cell>Nimi</Table.Cell>
              <Table.Cell>Viimeisin kirjautuminen</Table.Cell>
              <Table.Cell>Tila</Table.Cell>
              <Table.Cell>Taso</Table.Cell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {props.users.users.map(user => (
              <User user={user} key={user.id} />
            ))}
          </Table.Body>
        </Table>
      </Container>
    );
  } else {
    return null;
  }
};

const mapStateToProps = state => ({
  users: state.users,
  login: state.login
});

const connectedUserList = connect(mapStateToProps, null)(UserList);

export default connectedUserList;

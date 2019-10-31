import React from 'react';
import { connect } from 'react-redux';
import User from './User';
import { Container, Dimmer, Loader } from 'semantic-ui-react';
import { Table } from 'semantic-ui-react';
import { showNotificationWithTimeout } from '../../reducers/notificationReducer';

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
  return (
    <Container>
      <h3>Käyttäjät</h3>
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.Cell>Käyttäjätunnus</Table.Cell>
            <Table.Cell>Nimi</Table.Cell>
            <Table.Cell>Viimeisin kirjautuminen</Table.Cell>
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
};

const mapDispatchToProps = {
  showNotificationWithTimeout
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

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import User from './User';
import { Container, Dimmer, Loader } from 'semantic-ui-react';
import { Table } from 'semantic-ui-react';
import { showNotificationWithTimeout } from '../../reducers/notificationReducer';
import { initializeUsers } from '../../actions/userActions';

const UserList = props => {
  // initial users list
  useEffect(() => {
    props.initializeUsers();
    // eslint-disable-next-line
  }, []);

  if (props.users.users === null) {
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
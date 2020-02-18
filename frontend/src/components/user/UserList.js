import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Dimmer, Loader, Table } from 'semantic-ui-react';
import AddUserModal from './AddUserModal';
import User from './UserListItem';

const UserList = ({ users, login }) => {
  if (users.users === null || users.loading === true) {
    return (
      <Container>
        <Dimmer active inverted>
          <Loader size='medium'>Haetaan käyttäjiä...</Loader>
        </Dimmer>
      </Container>
    );
  }

  if (login.level === 3) {
    return (
      <Container>
        <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
          <h3 style={{ display: 'inline' }}>Käyttäjät</h3>
          <AddUserModal />
        </div>
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
            {users.users.map(user => (
              <User user={user} key={user.id} />
            ))}
          </Table.Body>
        </Table>
      </Container>
    );
  }
  return null;
};

UserList.propTypes = {
  login: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    id: PropTypes.number,
    level: PropTypes.number,
    loading: PropTypes.bool,
    status: PropTypes.number,
    token: PropTypes.string,
    username: PropTypes.string
  }),
  users: PropTypes.shape({
    users: PropTypes.arrayOf(
      PropTypes.shape({
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
      })
    ),
    loading: PropTypes.bool
  })
};

const mapStateToProps = state => ({
  users: state.users,
  login: state.login
});

const connectedUserList = connect(mapStateToProps, null)(UserList);

export default connectedUserList;

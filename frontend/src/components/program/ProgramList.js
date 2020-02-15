import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Dimmer, Loader, Table } from 'semantic-ui-react';
import ProgramListItem from './ProgramListItem';
import AddProgramModal from './AddProgramModal';
import Notification from '../layout/Notification';
import { getAllPrograms } from '../../actions/programActions';

const ProgramList = ({ getAllPrograms, programs, login }) => {
  useEffect(() => {
    getAllPrograms();
    // eslint-disable-next-line
  }, []);
  if (programs.allPrograms === null || programs.loading === true) {
    return (
      <Container>
        <Dimmer active inverted>
          <Loader size='medium'>Haetaan ohjelmia...</Loader>
        </Dimmer>
      </Container>
    );
  }
  if (login.level === 3 || login.level === 2) {
    return (
      <Container>
        <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
          <h3 style={{ display: 'inline' }}>Ohjelmat</h3>
          <AddProgramModal />
        </div>

        <Notification />
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.Cell>ID</Table.Cell>
              <Table.Cell>Nimi</Table.Cell>
              <Table.Cell>Tarkenne</Table.Cell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {programs.allPrograms.map(program => (
              <ProgramListItem program={program} key={program.id} />
            ))}
          </Table.Body>
        </Table>
      </Container>
    );
  }
  return null;
};

ProgramList.propTypes = {
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
  programs: PropTypes.shape({
    activePrograms: PropTypes.arrayOf(
      PropTypes.shape({
        created_at: PropTypes.string,
        display: PropTypes.number,
        id: PropTypes.number,
        identifier: PropTypes.string,
        name: PropTypes.string,
        site: PropTypes.number,
        updated_at: PropTypes.string,
        user_id: PropTypes.number
      })
    ),
    allPrograms: PropTypes.arrayOf(
      PropTypes.shape({
        created_at: PropTypes.string,
        display: PropTypes.number,
        id: PropTypes.number,
        identifier: PropTypes.string,
        name: PropTypes.string,
        site: PropTypes.number,
        updated_at: PropTypes.string,
        user_id: PropTypes.number
      })
    ),
    loading: PropTypes.bool
  }),
  getAllPrograms: PropTypes.func
};

const mapStateToProps = state => ({
  programs: state.programs,
  login: state.login
});

const connectedProgramList = connect(mapStateToProps, { getAllPrograms })(
  ProgramList
);

export default connectedProgramList;

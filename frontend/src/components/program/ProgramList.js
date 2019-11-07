import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ProgramListItem from './ProgramListItem';
import AddProgramModal from './AddProgramModal';
import Notification from '../layout/Notification';
import { getAllPrograms } from '../../actions/programActions';
import { Container, Dimmer, Loader } from 'semantic-ui-react';
import { Table } from 'semantic-ui-react';

const ProgramList = props => {
  useEffect(() => {
    props.getAllPrograms();
    //eslint-disable-next-line
  }, []);
  if (props.programs.allPrograms === null || props.programs.loading === true) {
    return (
      <Container>
        <Dimmer active inverted>
          <Loader size="medium">Haetaan ohjelmia...</Loader>
        </Dimmer>
      </Container>
    );
  }
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
          {props.programs.allPrograms.map(program => (
            <ProgramListItem program={program} key={program.id} />
          ))}
        </Table.Body>
      </Table>
    </Container>
  );
};

const mapStateToProps = state => ({
  programs: state.programs,
  login: state.login
});

const connectedProgramList = connect(
  mapStateToProps,
  { getAllPrograms }
)(ProgramList);

export default connectedProgramList;

import React from 'react';
import { connect } from 'react-redux';
import ProgramListItem from './ProgramListItem';
import { Container, Dimmer, Loader } from 'semantic-ui-react';
import { Table } from 'semantic-ui-react';

const ProgramList = props => {
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
      <h3>Ohjelmat</h3>
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.Cell>ID</Table.Cell>
            <Table.Cell>Nimi</Table.Cell>
            <Table.Cell>Tarkenne</Table.Cell>
            <Table.Cell></Table.Cell>
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
  null
)(ProgramList);

export default connectedProgramList;

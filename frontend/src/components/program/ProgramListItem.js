import React from 'react';
import { connect } from 'react-redux';
import EditProgramModal from './EditProgramModal';
import MergePrograms from './MergePrograms';
import { setNotification } from '../../reducers/notificationReducer';
import { Table, Container, Dimmer, Loader } from 'semantic-ui-react';

const ProgramListItem = props => {
  if (props.program === null) {
    return (
      <Container>
        <Dimmer active inverted>
          <Loader size="medium">Haetaan Ohjelmia...</Loader>
        </Dimmer>
      </Container>
    );
  }

  let className;
  if (props.program.display === 1) {
    className = 'active-program';
  }

  return (
    <Table.Row className={className}>
      <Table.Cell>
        <MergePrograms
          program_id={props.program.id}
          program_name={props.program.name}
        />
      </Table.Cell>
      {/* <Table.Cell>{props.program.name}</Table.Cell> */}
      <Table.Cell>
        <EditProgramModal program={props.program} />
      </Table.Cell>
      <Table.Cell>{props.program.identifier}</Table.Cell>
    </Table.Row>
  );
};

const connectedProgramListItem = connect(null, { setNotification })(
  ProgramListItem
);

export default connectedProgramListItem;

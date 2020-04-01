import React from 'react';
import PropTypes from 'prop-types';
import { Table, Container, Dimmer, Loader } from 'semantic-ui-react';
import EditProgramModal from './EditProgramModal';
import MergePrograms from './MergePrograms';

const ProgramListItem = ({ program }) => {
  if (program === null) {
    return (
      <Container>
        <Dimmer active inverted>
          <Loader size='medium'>Haetaan Ohjelmia...</Loader>
        </Dimmer>
      </Container>
    );
  }

  let className;
  if (program.display === 1) {
    className = 'active-program';
  }

  return (
    <Table.Row className={className}>
      <Table.Cell>
        <MergePrograms program_id={program.id} program_name={program.name} />
      </Table.Cell>
      {/* <Table.Cell>{program.name}</Table.Cell> */}
      <Table.Cell>
        <EditProgramModal program={program} />
      </Table.Cell>
      <Table.Cell>{program.identifier}</Table.Cell>
    </Table.Row>
  );
};

ProgramListItem.propTypes = {
  program: PropTypes.shape({
    created_at: PropTypes.string,
    display: PropTypes.number,
    id: PropTypes.number,
    identifier: PropTypes.string,
    name: PropTypes.string,
    site: PropTypes.number,
    updated_at: PropTypes.string,
    user_id: PropTypes.number
  })
};

export default ProgramListItem;

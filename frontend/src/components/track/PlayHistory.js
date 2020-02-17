import React from 'react';
import PropTypes from 'prop-types';
import { Table, Dimmer, Loader } from 'semantic-ui-react';
import PlayHistoryItem from './PlayHistoryItem';

const PlayHistory = ({ playhistory }) => {
  if (playhistory === null) {
    return (
      <Dimmer>
        <Loader>Ladataan...</Loader>
      </Dimmer>
    );
  }
  return (
    <React.Fragment>
      <h4>Soittohistoria</h4>
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.Cell>Päivämäärä</Table.Cell>
            <Table.Cell>Ohjelma</Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {playhistory.map(pgm => (
            <PlayHistoryItem key={pgm.report_id} pgm={pgm} />
          ))}
        </Table.Body>
      </Table>
    </React.Fragment>
  );
};

PlayHistory.propTypes = {
  playhistory: PropTypes.arrayOf(
    PropTypes.shape({
      program_name: PropTypes.string,
      program_date: PropTypes.string,
      program_id: PropTypes.number,
      report_id: PropTypes.number,
      track_id: PropTypes.number
    })
  )
};

export default PlayHistory;

import React from 'react';
import { Table, Dimmer, Loader } from 'semantic-ui-react';
import PlayHistoryItem from './PlayHistoryItem';

const PlayHistory = props => {
  console.log('playhistory props', props);
  if (props.playhistory === null) {
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
          {props.playhistory.map(pgm => (
            <PlayHistoryItem key={pgm.report_id} pgm={pgm} />
          ))}
        </Table.Body>
      </Table>
    </React.Fragment>
  );
};

export default PlayHistory;

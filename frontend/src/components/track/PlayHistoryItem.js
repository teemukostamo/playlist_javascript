import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'semantic-ui-react';

const PlayHistoryItem = props => {
  console.log('playhistoryitem props', props);
  return (
    <Table.Row>
      <Table.Cell>{props.pgm.program_date}</Table.Cell>
      <Table.Cell>
        <Link to={`/reports/${props.pgm.report_id}`}>
          {props.pgm.program_name}
        </Link>
      </Table.Cell>
    </Table.Row>
  );
};

export default PlayHistoryItem;

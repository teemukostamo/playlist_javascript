import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table } from 'semantic-ui-react';

const PlayHistoryItem = ({ pgm }) => {
  return (
    <Table.Row>
      <Table.Cell>{pgm.program_date}</Table.Cell>
      <Table.Cell>
        <Link to={`/reports/${pgm.report_id}`}>{pgm.program_name}</Link>
      </Table.Cell>
    </Table.Row>
  );
};

PlayHistoryItem.propTypes = {
  pgm: PropTypes.shape({
    program_name: PropTypes.string,
    program_date: PropTypes.string,
    program_id: PropTypes.number,
    report_id: PropTypes.number,
    track_id: PropTypes.number
  })
};

export default PlayHistoryItem;

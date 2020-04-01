import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import moment from 'moment';
import { downloadReport } from '../../services/reports';

const ReportTransferListItem = ({ item }) => {
  const downloadTransfer = filename => {
    downloadReport(filename);
  };
  return (
    <Table.Row>
      <Table.Cell>{item.created_at}</Table.Cell>
      <Table.Cell>
        {item.first_name} {item.last_name}
      </Table.Cell>
      <Table.Cell>{moment(item.period).format('MM/YYYY')}</Table.Cell>
      <Table.Cell>
        <button
          type='button'
          className='link-btn'
          onClick={() => downloadTransfer(item.filename)}
        >
          {item.filename}
        </button>
      </Table.Cell>
    </Table.Row>
  );
};

ReportTransferListItem.propTypes = {
  item: PropTypes.shape({
    created_at: PropTypes.string,
    filename: PropTypes.string,
    first_name: PropTypes.string,
    id: PropTypes.number,
    last_name: PropTypes.string,
    period: PropTypes.string,
    status: PropTypes.number,
    updated_at: PropTypes.string,
    user_id: PropTypes.number,
    username: PropTypes.string
  })
};

export default ReportTransferListItem;

import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table } from 'semantic-ui-react';
import { downloadReport } from '../../services/reports';
import moment from 'moment';

const ReportTransferListItem = props => {
  const downloadTransfer = filename => {
    downloadReport(filename);
  };
  return (
    <Table.Row>
      <Table.Cell>{props.item.created_at}</Table.Cell>
      <Table.Cell>
        {props.item.first_name} {props.item.last_name}
      </Table.Cell>
      <Table.Cell>{moment(props.item.period).format('MM/YYYY')}</Table.Cell>
      <Table.Cell>
        <Link to="#" onClick={() => downloadTransfer(props.item.filename)}>
          {props.item.filename}
        </Link>
      </Table.Cell>
    </Table.Row>
  );
};

const connectedReportTransferListItem = connect(null, { downloadReport })(
  ReportTransferListItem
);

export default connectedReportTransferListItem;

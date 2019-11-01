import React from 'react';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
import { Table } from 'semantic-ui-react';

const ReportTransferListItem = props => {
  return (
    <Table.Row>
      <Table.Cell>{props.item.created_at}</Table.Cell>
      <Table.Cell>
        {props.item.first_name} {props.item.last_name}
      </Table.Cell>
      <Table.Cell>{props.item.period}</Table.Cell>
      <Table.Cell>
        <Link to={`reporttransfer/${props.item.filename}`}>
          {props.item.filename}
        </Link>
      </Table.Cell>
    </Table.Row>
  );
};

export default ReportTransferListItem;

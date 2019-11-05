import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table } from 'semantic-ui-react';

const inProgressReportListItem = ({ report }) => {
  console.log(report);
  return (
    <React.Fragment>
      <Table.Row>
        <Table.Cell>
          <Link to={`reports/${report.id}`}>{report.name}</Link>
        </Table.Cell>
        <Table.Cell>{report.program_date}</Table.Cell>
        <Table.Cell>{report.program_no}</Table.Cell>
      </Table.Row>
    </React.Fragment>
  );
};

export default inProgressReportListItem;

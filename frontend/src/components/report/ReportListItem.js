import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table } from 'semantic-ui-react';
import { getOneReport } from '../../actions/reportActions';

const ReportListItem = props => {
  return (
    <React.Fragment>
      <Table.Row>
        <Table.Cell>{props.report.program_no}</Table.Cell>
        <Table.Cell>
          <Link to={`reports/${props.report.id}`}>{props.report.name}</Link>
        </Table.Cell>
        <Table.Cell>
          {props.report.program_date} {props.report.program_start_time} -{' '}
          {props.report.program_end_time}
        </Table.Cell>
        <Table.Cell>{props.report.status}</Table.Cell>
      </Table.Row>
    </React.Fragment>
  );
};

// const mapStateToProps = state => ({
//   report: state.report
// });

const connectedReportListItem = connect(
  null,
  { getOneReport }
)(ReportListItem);

export default connectedReportListItem;

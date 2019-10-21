import React from 'react';
import { connect } from 'react-redux';

const ReportListItem = props => {
  return (
    <tr>
      <td>{props.report.program_no}</td>
      <td>{props.report.name}</td>
      <td>
        {props.report.program_date} {props.report.program_start_time} -{' '}
        {props.report.program_end_time}
      </td>
      <td>{props.report.status}</td>
    </tr>
  );
};

export default ReportListItem;

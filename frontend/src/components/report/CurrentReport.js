import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

const CurrentReport = props => {
  if (!props.report.reportDetails) {
    return null;
  } else {
    return (
      <div
        style={{
          display: 'inline',
          color: 'white',
          float: 'right',
          marginTop: 'auto',
          // marginLeft: 'auto',
          marginRight: '0.6rem',
          marginBottom: '0.7rem'
        }}
      >
        <Link to={`/reports/${props.report.reportDetails.id}`}>
          {props.report.reportDetails.program_name} <br />
          {moment(props.report.reportDetails.program_date).format(
            'DD.MM.YYYY'
          )}{' '}
          {props.report.reportDetails.program_start_time.slice(0, -3)} -{' '}
          {props.report.reportDetails.program_end_time.slice(0, -3)}
        </Link>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    report: state.report
  };
};

const connectedCurrentReport = connect(mapStateToProps, null)(CurrentReport);

export default connectedCurrentReport;

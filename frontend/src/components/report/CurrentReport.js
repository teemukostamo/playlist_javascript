import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

const CurrentReport = ({ report }) => {
  if (!report.reportDetails) {
    return null;
  }
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
      <Link to={`/reports/${report.reportDetails.id}`}>
        {report.reportDetails.program_name} <br />
        {moment(report.reportDetails.program_date).format('DD.MM.YYYY')}{' '}
        {report.reportDetails.program_start_time.slice(0, -3)} -{' '}
        {report.reportDetails.program_end_time.slice(0, -3)}
      </Link>
    </div>
  );
};

CurrentReport.propTypes = {
  report: PropTypes.shape({
    reportDetails: PropTypes.shape({
      id: PropTypes.number,
      program_name: PropTypes.string,
      program_date: PropTypes.string,
      program_start_time: PropTypes.string,
      program_end_time: PropTypes.string
    })
  })
};

const mapStateToProps = state => {
  return {
    report: state.report
  };
};

const connectedCurrentReport = connect(mapStateToProps, null)(CurrentReport);

export default connectedCurrentReport;

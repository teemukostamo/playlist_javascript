import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { showNotificationWithTimeout } from '../reducers/notificationReducer';
import { getOneReport } from '../reducers/reportReducer';
import ReportFilterForm from './forms/ReportFilterForm';

const ReportList = props => {
  console.log('Reportlist props', props);
  return (
    <div>
      <h4>List of reports</h4>
      <ReportFilterForm />
      <h4>filtered results come here</h4>
      <ul>
        {props.report.map(r => (
          <li key={r.track_id}>
            {r.artist_name} {r.track_title}
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = state => {
  console.log('report list state to props', state);
  return {
    report: state.report,
    notification: state.notification,
    users: state.users,
    login: state.login
  };
};

const mapDispatchToProps = {
  showNotificationWithTimeout,
  getOneReport
};

const connectedReportList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportList);

export default connectedReportList;

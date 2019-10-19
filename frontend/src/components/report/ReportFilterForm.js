import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';

import { connect } from 'react-redux';
import { getOneReport, getAllReportsByDate } from '../../actions/reportActions';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import moment from 'moment';

const ReportFilterForm = props => {
  const [reportid, setReportid] = useState('');
  const [pgmMonth, setPgmMonth] = useState(moment().format('YYYY-MM'));

  // initial reports list
  useEffect(() => {
    props.getAllReportsByDate(pgmMonth);
  }, []);

  const getReportsByMonth = () => {
    console.log(`getting reports from ${pgmMonth}`);
    props.getAllReportsByDate(pgmMonth);
  };

  const idchange = event => {
    setReportid(event.target.value);
  };
  const onGetReportByIdClick = () => {
    console.log('klik', reportid);

    props.getOneReport(reportid);
  };

  return (
    <div>
      <input onChange={idchange} />
      <button onClick={() => onGetReportByIdClick()}>get report</button>
      <button onClick={() => getReportsByMonth()}>get report by month</button>
    </div>
  );
};

const mapStateToProps = state => {
  // console.log('reportfilterform state to props', state);
  return {
    reports: state.reports,
    notification: state.notification,
    users: state.users,
    login: state.login
  };
};

const mapDispatchToProps = {
  getOneReport,
  getAllReportsByDate
};

const connectedReportFilterForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportFilterForm);

export default connectedReportFilterForm;

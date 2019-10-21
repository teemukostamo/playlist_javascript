import React, { useState, useEffect } from 'react';
// import Moment from 'react-moment';

import { connect } from 'react-redux';
import { getOneReport } from '../../actions/reportActions';
import { getAllReportsByDate } from '../../actions/reportsListActions';
import moment from 'moment';

const ReportFilterForm = props => {
  const [reportid, setReportid] = useState('');
  const [reportMonth, setReportMonth] = useState('');
  const [reportYear, setReportYear] = useState('');
  // const [reportMonth, setReportMonth] = useState('2018-10');

  // initial reports list
  // useEffect(() => {
  //   props.getAllReportsByDate(moment().format('YYYY-MM'));
  // }, []);

  console.log(reportMonth);
  console.log(reportYear);

  const getReportsByMonth = () => {
    const date = reportYear + '-' + reportMonth;
    console.log(date);
    console.log('klik');
    props.getAllReportsByDate(date);
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
      <button onClick={() => getReportsByMonth()}>get reports from:</button>
      <div className="row">
        <div className="input-field col s5">
          <select
            name="month"
            id=""
            onChange={e => setReportMonth(e.target.value)}
          >
            Valitse kuukausi
            <option value="01">Tammikuu</option>
            <option value="02">Helmikuu</option>
            <option value="03">Maaliskuu</option>
          </select>
        </div>
        <div className="input-field col s5">
          <select
            name="year"
            id=""
            onChange={e => setReportYear(e.target.value)}
          >
            Valitse Vuosi
            <option value="2018">2018</option>
            <option value="2017">2017</option>
            <option value="2016">2016</option>
          </select>
        </div>
        <div className="input-field col s2"></div>
      </div>

      {/* <input onChange={idchange} />
      <button onClick={() => onGetReportByIdClick()}>get report</button>
      <button onClick={() => getReportsByMonth()}>get report by month</button> */}
    </div>
  );
};

const mapStateToProps = state => {
  // console.log('reportfilterform state to props', state);
  return {
    reports: state.reports,
    reportsList: state.reportsList,
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

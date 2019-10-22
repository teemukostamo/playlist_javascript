import React from 'react';
import { connect } from 'react-redux';
// import Moment from 'react-moment';
import { showNotificationWithTimeout } from '../../reducers/notificationReducer';
import { getOneReport } from '../../actions/reportActions';
import ReportFilterForm from './ReportFilterForm';
import ReportListItem from './ReportListItem';
// import moment from 'moment';

const ReportList = props => {
  // console.log('Reportlist props', props);
  console.log(props);
  if (props.reportsList.length === 0) {
    return (
      <div>
        <h4>Ei raportteja valittuna ajankohtana. Valitse vuosi ja kuukausi</h4>
        <ReportFilterForm />
      </div>
    );
  }

  return (
    <div>
      <div></div>

      <table>
        <thead>
          <tr>
            <td>
              pgmno <ReportFilterForm />
            </td>
            <td>Nimi</td>
            <td>Aika</td>
            <td>Tila</td>
          </tr>
        </thead>
        <tbody>
          {props.reportsList.map(r => (
            <ReportListItem key={r.id} report={r} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = state => {
  console.log('report list state to props', state);
  return {
    report: state.report,
    reportsList: state.reportsList,
    notification: state.notification,
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

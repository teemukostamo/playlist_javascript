import React, { useState } from 'react';
// import Moment from 'react-moment';
import { connect } from 'react-redux';
import { getOneReport } from '../../actions/reportActions';
import { getAllReportsByDate } from '../../actions/reportsListActions';
import { Dropdown, Button } from 'semantic-ui-react';
// import moment from 'moment';

const ReportFilterForm = props => {
  const friendOptions = [
    {
      key: 'Jenny Hess',
      text: 'Jenny Hess',
      value: 'Jenny Hess'
    },
    {
      key: 'Elliot Fu',
      text: 'Elliot Fu',
      value: 'Elliot Fu'
    },
    {
      key: 'Stevie Feliciano',
      text: 'Stevie Feliciano',
      value: 'Stevie Feliciano'
    },
    {
      key: 'Christian',
      text: 'Christian',
      value: 'Christian'
    },
    {
      key: 'Matt',
      text: 'Matt',
      value: 'Matt'
    },
    {
      key: 'Justen Kitsune',
      text: 'Justen Kitsune',
      value: 'Justen Kitsune'
    }
  ];
  const [reportMonth, setReportMonth] = useState('');
  const [reportYear, setReportYear] = useState('');

  // // initial reports list
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

  return (
    <div>
      <React.Fragment>
        <Button onClick={() => getReportsByMonth()}>
          Hae raportit ajalta:
        </Button>
        <Dropdown
          placeholder="Vuosi"
          openOnFocus
          selection
          options={friendOptions}
        />{' '}
        <Dropdown
          placeholder="Kuukausi"
          openOnFocus={false}
          selection
          options={friendOptions}
        />
      </React.Fragment>
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
    </div>
  );
};

const mapStateToProps = state => {
  console.log('reportfilterform state to props', state);
  return {
    report: state.report,
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

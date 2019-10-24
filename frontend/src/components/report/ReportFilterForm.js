import React, { useState, useEffect } from 'react';
// import Moment from 'react-moment';
import { connect } from 'react-redux';
import { getOneReport } from '../../actions/reportActions';
import { getAllReportsByDate } from '../../actions/reportsListActions';
import { Dropdown, Button, Select } from 'semantic-ui-react';
// import moment from 'moment';

const ReportFilterForm = props => {
  const [reportMonth, setReportMonth] = useState('');
  const [reportYear, setReportYear] = useState('');
  const [userId, setUserId] = useState('');
  // initial reports list
  // useEffect(() => {
  //   props.getAllReportsByDate(moment().format('YYYY-MM'));
  //   // eslint-disable-next-line
  // }, []);
  // month options
  if (props.users.users === null) {
    return <div>loading</div>;
  }
  const monthOptions = [
    {
      key: '01',
      text: 'Tammikuu',
      value: '01'
    },
    {
      key: '02',
      text: 'Helmikuu',
      value: '02'
    },
    {
      key: '03',
      text: 'Maaliskuu',
      value: '03'
    },
    {
      key: '04',
      text: 'Huhtikuu',
      value: '04'
    },
    {
      key: '05',
      text: 'Toukokuu',
      value: '05'
    },
    {
      key: '06',
      text: 'Kesäkuu',
      value: '06'
    },
    {
      key: '07',
      text: 'Heinäkuu',
      value: '07'
    },
    {
      key: '08',
      text: 'Elokuu',
      value: '08'
    },
    {
      key: '09',
      text: 'Syyskuu',
      value: '09'
    },
    {
      key: '10',
      text: 'Lokakuu',
      value: '10'
    },
    {
      key: '11',
      text: 'Marraskuu',
      value: '11'
    },
    {
      key: '12',
      text: 'Joulukuu',
      value: '12'
    }
  ];
  // year options
  const date = new Date().getFullYear() + 1;
  const years = [];
  for (var i = 2001; i <= date; i++) {
    years.push(i);
  }
  let yearOptions = years.map(option => ({
    key: option,
    text: option,
    value: option
  }));
  yearOptions = yearOptions.reverse();
  const userOptions = props.users.users.map(user => ({
    key: user.id,
    text: `${user.first_name} ${user.last_name}`,
    value: user.id
  }));

  console.log(userOptions);
  console.log(reportMonth);
  console.log(reportYear);

  const getReportsByMonth = () => {
    const date = reportYear + '-' + reportMonth;
    console.log(date);
    console.log('klik');
    props.getAllReportsByDate(date);
  };

  // get month from dropdown
  const getMonth = (event, { value }) => {
    event.preventDefault();
    setReportMonth(value);
  };

  // get month from dropdown
  const getYear = (event, { value }) => {
    event.preventDefault();
    setReportYear(value);
  };
  const getUser = (event, { value }) => {
    event.preventDefault();
    setUserId(value);
  };
  console.log(userId);

  return (
    <React.Fragment>
      <Button onClick={() => getReportsByMonth()}>Hae raportit ajalta:</Button>
      <Dropdown
        placeholder="Vuosi"
        openOnFocus
        selection
        options={yearOptions}
        onChange={getYear}
      />{' '}
      <Dropdown
        placeholder="Kuukausi"
        openOnFocus={false}
        selection
        options={monthOptions}
        onChange={getMonth}
      />
      <Dropdown
        placeholder="Käyttäjä"
        openOnFocus={false}
        selection
        options={userOptions}
        onChange={getUser}
      />
    </React.Fragment>
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

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { getOneReport } from '../../actions/reportActions';
import {
  getAllReportsByDate,
  getAllReportsByDateByUser,
  filterByUserId,
  filterByStatus,
  filterByText
} from '../../actions/reportsListActions';
import { Dropdown, Button, Form, Dimmer, Loader } from 'semantic-ui-react';

const ReportFilterForm = props => {
  const [reportMonth, setReportMonth] = useState('');
  const [reportYear, setReportYear] = useState('');

  if (props.users.users === null) {
    return (
      <Dimmer active inverted>
        <Loader inverted content="Ladataan..." />
      </Dimmer>
    );
  }

  // const teststatus = 0;

  // const reports = props.reportsList.reportsList.filter(
  //   r => r.status === teststatus
  // );
  // console.log(reports);
  // month options
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

  const getReportsByMonth = () => {
    const date = reportYear + '-' + reportMonth;
    console.log(date);
    console.log('klik');
    if (props.login.level === 1) {
      props.getAllReportsByDateByUser(date, props.login.id);
    } else {
      props.getAllReportsByDate(date);
    }
  };

  // get month from dropdown
  const getMonth = (event, { value }) => {
    event.preventDefault();
    setReportMonth(value);
    console.log(reportMonth);
  };

  // get year from dropdown
  const getYear = (event, { value }) => {
    event.preventDefault();
    setReportYear(value);
  };

  return (
    <React.Fragment>
      <Form>
        <h2>Hae raportit ajalta:</h2>
        <Form.Group widths="equal">
          <Form.Field>
            <Dropdown
              placeholder="Kuukausi"
              openOnFocus={false}
              selection
              options={monthOptions}
              onChange={getMonth}
              value={reportMonth}
            />
          </Form.Field>
          <Form.Field>
            <Dropdown
              placeholder="Vuosi"
              openOnFocus
              selection
              options={yearOptions}
              onChange={getYear}
              value={reportYear}
            />{' '}
          </Form.Field>
          <Form.Field>
            <Button color="blue" onClick={() => getReportsByMonth()}>
              HAE
            </Button>
          </Form.Field>
          <Form.Field></Form.Field>
        </Form.Group>
      </Form>
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
  getAllReportsByDate,
  getAllReportsByDateByUser,
  filterByUserId,
  filterByStatus,
  filterByText
};

const connectedReportFilterForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportFilterForm);

export default connectedReportFilterForm;

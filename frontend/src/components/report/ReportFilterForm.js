import React, { useState } from 'react';
import { connect } from 'react-redux';
import { getOneReport } from '../../actions/reportActions';
import {
  getAllReportsByDate,
  sortByUserId
} from '../../actions/reportsListActions';
import { Dropdown, Button, Form, Input } from 'semantic-ui-react';

const ReportFilterForm = props => {
  // const [startDate, setStartDate] = useState(new Date());
  const [reportMonth, setReportMonth] = useState('');
  const [reportYear, setReportYear] = useState('');
  const [userId, setUserId] = useState('');
  const [status, setStatus] = useState('');
  const [filterText, setFilterText] = useState('');
  console.log(filterText);

  if (props.users.users === null) {
    return <div>loading</div>;
  }
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
  const userOptions = props.users.users.map(user => ({
    key: user.id,
    text: `${user.first_name} ${user.last_name}`,
    value: user.id
  }));
  const addAllToUserOptions = [
    {
      key: 0,
      text: 'Kaikki',
      value: 0
    },
    ...userOptions
  ];
  // status options
  const statusOptions = [
    {
      key: '2',
      text: 'Kaikki',
      value: '2'
    },
    {
      key: '0',
      text: 'Keskeneräinen',
      value: '0'
    },
    {
      key: '1',
      text: 'Valmis',
      value: '1'
    },
    {
      key: '9',
      text: 'Poistettu',
      value: '9'
    }
  ];

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

  // get year from dropdown
  const getYear = (event, { value }) => {
    event.preventDefault();
    setReportYear(value);
  };
  const getUser = (event, { value }) => {
    event.preventDefault();
    setUserId(value);
    console.log('user id', userId);
    props.sortByUserId(userId);
  };
  const getStatus = (event, { value }) => {
    event.preventDefault();
    setStatus(value);

    console.log('tila', status);
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
            />
          </Form.Field>
          <Form.Field>
            <Dropdown
              placeholder="Vuosi"
              openOnFocus
              selection
              options={yearOptions}
              onChange={getYear}
            />{' '}
          </Form.Field>
        </Form.Group>

        <Form.Field>
          <Button color="blue" onClick={() => getReportsByMonth()}>
            HAE
          </Button>
        </Form.Field>
        <h4>Suodata:</h4>

        <Form.Group widths="equal">
          <Form.Field>
            <Dropdown
              placeholder="Käyttäjä"
              openOnFocus={false}
              search
              selection
              options={addAllToUserOptions}
              onChange={getUser}
            />
          </Form.Field>
          <Form.Field>
            <Dropdown
              placeholder="Tila"
              openOnFocus
              selection
              search
              options={statusOptions}
              onChange={getStatus}
            />{' '}
          </Form.Field>
          <Form.Field>
            <Input
              type="text"
              placeholder="Tekstisuodatus"
              onChange={e => setFilterText(e.target.value)}
            />
          </Form.Field>
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
  sortByUserId
};

const connectedReportFilterForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportFilterForm);

export default connectedReportFilterForm;

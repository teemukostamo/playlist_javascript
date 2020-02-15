import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dropdown, Button, Form, Dimmer, Loader } from 'semantic-ui-react';
import { getOneReport } from '../../actions/reportActions';
import {
  getAllReportsByDate,
  getAllReportsByDateByUser
} from '../../actions/reportsListActions';

const ReportFilterForm = ({
  users,
  login,
  getAllReportsByDate,
  getAllReportsByDateByUser
}) => {
  const [reportMonth, setReportMonth] = useState('');
  const [reportYear, setReportYear] = useState('');

  if (users.users === null) {
    return (
      <Dimmer active inverted>
        <Loader inverted content='Ladataan...' />
      </Dimmer>
    );
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
  const dateNow = new Date().getFullYear() + 1;
  const years = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 2001; i <= dateNow; i++) {
    years.push(i);
  }
  let yearOptions = years.map(option => ({
    key: option,
    text: option,
    value: option
  }));
  yearOptions = yearOptions.reverse();

  const getReportsByMonth = () => {
    const date = `${reportYear}-${reportMonth}`;

    if (login.level === 1) {
      getAllReportsByDateByUser(date, login.id);
    } else {
      getAllReportsByDate(date);
    }
  };

  const getMonth = (event, { value }) => {
    event.preventDefault();
    setReportMonth(value);
  };

  const getYear = (event, { value }) => {
    event.preventDefault();
    setReportYear(value);
  };

  return (
    <React.Fragment>
      <Form>
        <h2>Hae raportit ajalta:</h2>
        <Form.Group widths='equal'>
          <Form.Field>
            <Dropdown
              placeholder='Kuukausi'
              openOnFocus={false}
              selection
              options={monthOptions}
              onChange={getMonth}
              value={reportMonth}
            />
          </Form.Field>
          <Form.Field>
            <Dropdown
              placeholder='Vuosi'
              openOnFocus
              selection
              options={yearOptions}
              onChange={getYear}
              value={reportYear}
            />{' '}
          </Form.Field>
          <Form.Field>
            <Button color='blue' onClick={() => getReportsByMonth()}>
              HAE
            </Button>
          </Form.Field>
          <Form.Field></Form.Field>
        </Form.Group>
      </Form>
    </React.Fragment>
  );
};

ReportFilterForm.propTypes = {
  users: PropTypes.shape({
    users: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number
      })
    )
  }),
  login: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    id: PropTypes.number,
    level: PropTypes.number,
    loading: PropTypes.bool,
    status: PropTypes.number,
    token: PropTypes.string,
    username: PropTypes.string
  }),
  getAllReportsByDate: PropTypes.func,
  getAllReportsByDateByUser: PropTypes.func
};

const mapStateToProps = state => {
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
  getAllReportsByDateByUser
};

const connectedReportFilterForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportFilterForm);

export default connectedReportFilterForm;

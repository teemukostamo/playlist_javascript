import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button,
  Form,
  Header,
  Container,
  Dimmer,
  Loader
} from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import fi from 'date-fns/locale/fi';
import { getAllReportsByDate } from '../../actions/reportsListActions';
import { generateReportTransfer } from '../../actions/reportTransferActions';

const ReportTransferOptions = ({
  reportsList,
  login,
  getAllReportsByDateConnect,
  generateReportTransferConnect
}) => {
  const [pickerDate, setPickerDate] = useState(new Date());

  useEffect(() => {
    getAllReportsByDateConnect(moment(pickerDate).format('YYYY-MM'));
    // eslint-disable-next-line
  }, [pickerDate]);

  const getTransferFile = () => {
    const params = {
      user_id: login.id,
      status: 1,
      period: moment(pickerDate).format('YYYY-MM'),
      filename: `${moment(new Date()).format('YYYYMMDDhhmmss')}.txt`
    };
    generateReportTransferConnect(params);
  };

  if (reportsList.reportsList === null) {
    return (
      <Container>
        <Dimmer active inverted>
          <Loader size='medium'>Ladataan...</Loader>
        </Dimmer>
      </Container>
    );
  }

  if (reportsList.loading === true) {
    return (
      <Container>
        <Dimmer active inverted>
          <Loader size='medium'>Ladataan...</Loader>
        </Dimmer>
      </Container>
    );
  }

  return (
    <div>
      <Header>Hae siirtotiedosto ajalta:</Header>
      <Form>
        <Form.Field>
          <DatePicker
            selected={pickerDate}
            dateFormat='MMMM yyyy'
            onChange={date => setPickerDate(date)}
            showMonthYearPicker
            locale={fi}
          />
        </Form.Field>
        <Form.Field></Form.Field>
        <Form.Field>
          <Button color='blue' onClick={getTransferFile}>
            HAE
          </Button>
        </Form.Field>
      </Form>
    </div>
  );
};

ReportTransferOptions.propTypes = {
  generateReportTransferConnect: PropTypes.func,
  getAllReportsByDateConnect: PropTypes.func,
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
  reportsList: PropTypes.shape({
    reportsList: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        program_date: PropTypes.string,
        program_dj: PropTypes.string,
        program_start_time: PropTypes.string,
        program_end_time: PropTypes.string,
        program_no: PropTypes.number,
        rerun: PropTypes.number,
        status: PropTypes.number,
        user_id: PropTypes.number
      })
    ),
    loading: PropTypes.bool
  })
};

const mapStateToProps = state => {
  return {
    reportsList: state.reportsList,
    login: state.login
  };
};

const connectedReportTransferOptions = connect(mapStateToProps, {
  getAllReportsByDateConnect: getAllReportsByDate,
  generateReportTransferConnect: generateReportTransfer
})(ReportTransferOptions);

export default connectedReportTransferOptions;

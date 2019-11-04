import React, { useState, useEffect } from 'react';
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
import { getAllReportsByDate } from '../../actions/reportsListActions';
import { generateReportTransfer } from '../../actions/reportTransferActions';
import moment from 'moment';

const ReportTransferOptions = props => {
  console.log('report transfer options props', props);
  const [pickerDate, setPickerDate] = useState(new Date());
  // initial reports list
  useEffect(() => {
    props.getAllReportsByDate(moment(pickerDate).format('YYYY-MM'));
    // eslint-disable-next-line
  }, [pickerDate]);
  const getTransferFile = () => {
    console.log(
      'transferring file from ',
      moment(pickerDate).format('YYYY-MM')
    );
    const params = {
      user_id: props.login.id,
      status: 1,
      period: moment(pickerDate).format('YYYY-MM'),
      filename: moment(new Date()).format('YYYYMMDDhhmmss') + '.txt'
    };
    console.log(params);
    props.generateReportTransfer(params);
  };

  if (props.reportsList.reportsList === null) {
    return (
      <Container>
        <Dimmer active inverted>
          <Loader size="medium">Ladataan...</Loader>
        </Dimmer>
      </Container>
    );
  }

  if (props.reportsList.loading === true) {
    return (
      <Container>
        <Dimmer active inverted>
          <Loader size="medium">Ladataan...</Loader>
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
            dateFormat="MMMM yyyy"
            onChange={date => setPickerDate(date)}
            showMonthYearPicker
          />
        </Form.Field>
        <Form.Field>
          {/* löytyi {props.reportsList.reportsList.length} raporttia */}
        </Form.Field>
        <Form.Field>
          <Button color="blue" onClick={getTransferFile}>
            HAE
          </Button>
        </Form.Field>
      </Form>
    </div>
  );
};

const mapStateToProps = state => {
  console.log('report transfer options state to props', state);
  return {
    reportsList: state.reportsList,
    notification: state.notification,
    login: state.login
  };
};

const connectedReportTransferOptions = connect(
  mapStateToProps,
  { getAllReportsByDate, generateReportTransfer }
)(ReportTransferOptions);

export default connectedReportTransferOptions;

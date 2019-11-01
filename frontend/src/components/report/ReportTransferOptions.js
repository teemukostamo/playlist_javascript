import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Header } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import { getAllReportsByDate } from '../../actions/reportsListActions';
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
  };

  if (props.reportsList.reportsList === null) {
    return <div>loading</div>;
  }

  return (
    <div>
      <Header>Hae siirtotiedosto ajalta:</Header>
      <Form>
        <Form.Group widths="equal">
          <Form.Field>
            <DatePicker
              selected={pickerDate}
              dateFormat="yyyy-MM"
              onChange={date => setPickerDate(date)}
              showMonthYearPicker
            />
          </Form.Field>
          <Form.Field>
            {/* löytyi {props.reportsList.reportsList.length} raporttia */}
          </Form.Field>
          <Form.Field>
            <Button onClick={getTransferFile}>HAE</Button>
          </Form.Field>
        </Form.Group>
      </Form>
    </div>
  );
};

const mapStateToProps = state => {
  console.log('report transfer options state to props', state);
  return {
    reportsList: state.reportsList,
    notification: state.notification
  };
};

const connectedReportTransferOptions = connect(
  mapStateToProps,
  { getAllReportsByDate }
)(ReportTransferOptions);

export default connectedReportTransferOptions;

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
// import Moment from 'react-moment';
import { showNotificationWithTimeout } from '../../reducers/notificationReducer';
import { getOneReport } from '../../actions/reportActions';
import { getAllReportsByDate } from '../../actions/reportsListActions';
import ReportFilterForm from './ReportFilterForm';
import ReportListItem from './ReportListItem';
import moment from 'moment';
import { Container, Table, Dimmer, Segment, Loader } from 'semantic-ui-react';

const ReportList = props => {
  // initial reports list
  useEffect(() => {
    props.getAllReportsByDate(moment().format('YYYY-MM'));
    // eslint-disable-next-line
  }, []);
  console.log('Reportlist props', props);

  if (props.reportsList.reportsList === null || props.reportsList.loading) {
    return (
      <Segment>
        <Dimmer active inverted>
          <Loader inverted content="Ladataan..." />
        </Dimmer>
      </Segment>
    );
  }

  if (props.reportsList.reportsList.length === 0) {
    return (
      <Container>
        <h2>
          Ei raportteja valittuna ajankohtana. Valitse vuosi, kuukausi ja
          käyttäjä
        </h2>
        <ReportFilterForm />
      </Container>
    );
  }

  return (
    <Container>
      <ReportFilterForm />
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.Cell>Ohjelmanro</Table.Cell>
            <Table.Cell>Nimi</Table.Cell>
            <Table.Cell>Aika</Table.Cell>
            <Table.Cell>Tila</Table.Cell>
            <Table.Cell></Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {props.reportsList.reportsList.map(r => (
            <ReportListItem key={r.id} report={r} />
          ))}
        </Table.Body>
      </Table>
    </Container>
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
  getAllReportsByDate,
  getOneReport
};

const connectedReportList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportList);

export default connectedReportList;

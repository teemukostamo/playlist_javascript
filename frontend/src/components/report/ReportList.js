import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ReportFilterForm from './ReportFilterForm';
import FilterReportList from './FilterReportList';
import ReportListItem from './ReportListItem';
import Notification from '../layout/Notification';
import { getOneReport } from '../../actions/reportActions';
import {
  getAllReportsByDate,
  getAllReportsByDateByUser
} from '../../actions/reportsListActions';
import { setNotification } from '../../reducers/notificationReducer';
import { Container, Table, Dimmer, Loader } from 'semantic-ui-react';
import moment from 'moment';
moment.locale('fi');
console.log(moment.locale());

const ReportList = props => {
  // initial reports list
  useEffect(() => {
    if (props.login.level === 1) {
      if (props.reportsList.reportListDate === null) {
        props.getAllReportsByDateByUser(
          moment().format('YYYY-MM'),
          props.login.id
        );
      } else {
        props.getAllReportsByDateByUser(
          props.reportsList.reportListDate,
          props.login.id
        );
      }
    } else {
      if (props.reportsList.reportListDate === null) {
        props.getAllReportsByDate(moment().format('YYYY-MM'));
      } else {
        props.getAllReportsByDate(props.reportsList.reportListDate);
      }
    }

    // eslint-disable-next-line
  }, []);
  console.log('Reportlist props', props);

  if (props.reportsList.reportsList === null || props.reportsList.loading) {
    return (
      <Dimmer active inverted>
        <Loader inverted content="Ladataan..." />
      </Dimmer>
    );
  }

  if (props.reportsList.reportsList.length === 0) {
    return (
      <Container>
        <h2>Ei raportteja valittuna ajankohtana. Valitse vuosi ja kuukausi</h2>
        <ReportFilterForm />
      </Container>
    );
  }

  let reportListTimeDate;
  if (props.reportsList.reportListDate === null) {
    reportListTimeDate = moment().format('MMMM YYYY');
  } else {
    reportListTimeDate = moment(props.reportsList.reportListDate).format(
      'MMMM YYYY'
    );
  }

  let reportsToShow = props.reportsList.reportsList;

  reportsToShow =
    props.reportsList.filterByText === 0
      ? reportsToShow
      : (reportsToShow = reportsToShow.filter(report =>
          report.name
            .toLowerCase()
            .includes(props.reportsList.filterByText.toLowerCase())
        ));
  reportsToShow =
    props.reportsList.filterUserValue === null
      ? reportsToShow
      : (reportsToShow = reportsToShow.filter(
          report => report.user_id === props.reportsList.filterUserValue
        ));
  reportsToShow =
    props.reportsList.filterStatusValue === null
      ? reportsToShow
      : (reportsToShow = reportsToShow.filter(
          report => report.status === props.reportsList.filterStatusValue
        ));

  return (
    <Container>
      <ReportFilterForm />
      <Notification />
      <h3>Raportit {reportListTimeDate}</h3>
      <FilterReportList />
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.Cell>Ohjelmanro</Table.Cell>
            <Table.Cell>Nimi</Table.Cell>
            <Table.Cell>Aika</Table.Cell>
            <Table.Cell>Kello</Table.Cell>
            <Table.Cell>Tila</Table.Cell>
            <Table.Cell></Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {reportsToShow.map(r => (
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
  getAllReportsByDate,
  getAllReportsByDateByUser,
  getOneReport,
  setNotification
};

const connectedReportList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportList);

export default connectedReportList;

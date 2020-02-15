/* eslint-disable indent */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Container,
  Table,
  Dimmer,
  Loader,
  Responsive
} from 'semantic-ui-react';
import moment from 'moment';
import ReportFilterForm from './ReportFilterForm';
import FilterReportList from './FilterReportList';
import ReportListItem from './ReportListItem';
import Notification from '../layout/Notification';
import {
  getAllReportsByDate,
  getAllReportsByDateByUser
} from '../../actions/reportsListActions';

moment.locale('fi');

const ReportList = ({
  login,
  reportsList,
  getAllReportsByDate,
  getAllReportsByDateByUser
}) => {
  // initial reports list
  useEffect(() => {
    if (login.level === 1) {
      if (reportsList.reportListDate === null) {
        getAllReportsByDateByUser(moment().format('YYYY-MM'), login.id);
      } else {
        getAllReportsByDateByUser(reportsList.reportListDate, login.id);
      }
    } else if (reportsList.reportListDate === null) {
      getAllReportsByDate(moment().format('YYYY-MM'));
    } else {
      getAllReportsByDate(reportsList.reportListDate);
    }
    // eslint-disable-next-line
  }, []);

  if (reportsList.reportsList === null || reportsList.loading) {
    return (
      <Dimmer active inverted>
        <Loader inverted content='Ladataan...' />
      </Dimmer>
    );
  }

  if (reportsList.reportsList.length === 0) {
    return (
      <Container>
        <h2>Ei raportteja valittuna ajankohtana. Valitse vuosi ja kuukausi</h2>
        <ReportFilterForm />
      </Container>
    );
  }

  let reportListTimeDate;
  if (reportsList.reportListDate === null) {
    reportListTimeDate = moment().format('MMMM YYYY');
  } else {
    reportListTimeDate = moment(reportsList.reportListDate).format('MMMM YYYY');
  }

  let reportsToShow = reportsList.reportsList;

  reportsToShow =
    reportsList.filterByText === 0
      ? reportsToShow
      : (reportsToShow = reportsToShow.filter(report =>
          report.name
            .toLowerCase()
            .includes(reportsList.filterByText.toLowerCase())
        ));
  reportsToShow =
    reportsList.filterUserValue === null
      ? reportsToShow
      : (reportsToShow = reportsToShow.filter(
          report => report.user_id === reportsList.filterUserValue
        ));
  reportsToShow =
    reportsList.filterStatusValue === null
      ? reportsToShow
      : (reportsToShow = reportsToShow.filter(
          report => report.status === reportsList.filterStatusValue
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
            <Responsive as={Table.Cell} minWidth={768}>
              Ohjelmanro
            </Responsive>
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

ReportList.propTypes = {
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
  }).isRequired,
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
    reportListDate: PropTypes.string,
    loading: PropTypes.bool,
    filterByText: PropTypes.string,
    filterUserValue: PropTypes.number,
    filterStatusValue: PropTypes.number
  }),
  getAllReportsByDate: PropTypes.func,
  getAllReportsByDateByUser: PropTypes.func
};

const mapStateToProps = state => {
  return {
    report: state.report,
    reportsList: state.reportsList,
    login: state.login
  };
};

const mapDispatchToProps = {
  getAllReportsByDate,
  getAllReportsByDateByUser
};

const connectedReportList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportList);

export default connectedReportList;

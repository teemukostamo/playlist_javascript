import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Grid, Container, Header } from 'semantic-ui-react';
import InProgressReportListItem from './InProgressReportListItem';
import { getAllInProgress } from '../../actions/reportsListActions';

const InProgressReportsList = ({
  reportsList,
  login,
  getAllInProgressConnect
}) => {
  useEffect(() => {
    getAllInProgressConnect(login.id);
    // eslint-disable-next-line
  }, []);

  if (reportsList.loading === true) {
    return (
      <div>
        <h3>Omat keskeneräiset raportit</h3>
        <div>ladataan...</div>
      </div>
    );
  }

  if (reportsList.inProgress === null) {
    return null;
  }
  if (reportsList.inProgress.length === 0) {
    return (
      <Grid.Column>
        <Container>
          <h3>Omat keskeneräiset raportit</h3>
          ei keskeneräisiä raportteja
        </Container>
      </Grid.Column>
    );
  }
  return (
    <React.Fragment>
      <Grid.Column>
        <Container>
          <Header>Omat keskeneräiset raportit</Header>
          <Table striped>
            <Table.Header>
              <Table.Row>
                <Table.Cell>Ohjelma</Table.Cell>
                <Table.Cell>Aika</Table.Cell>
                <Table.Cell>Nro</Table.Cell>
                <Table.Cell></Table.Cell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {reportsList.inProgress.map(r => (
                <InProgressReportListItem key={r.id} report={r} />
              ))}
            </Table.Body>
          </Table>
        </Container>
      </Grid.Column>
    </React.Fragment>
  );
};

InProgressReportsList.propTypes = {
  reportsList: PropTypes.shape({
    inProgress: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        program_date: PropTypes.string,
        program_dj: PropTypes.string,
        program_end_time: PropTypes.string,
        program_no: PropTypes.number,
        program_start_time: PropTypes.string,
        rerun: PropTypes.number,
        status: PropTypes.number,
        user_id: PropTypes.number
      })
    ),
    loading: PropTypes.bool
  }),
  login: PropTypes.shape({
    id: PropTypes.number
  }),
  getAllInProgressConnect: PropTypes.func
};

const mapStateToProps = state => {
  return {
    reportsList: state.reportsList,
    login: state.login
  };
};

const connectedInProgressReportsList = connect(mapStateToProps, {
  getAllInProgressConnect: getAllInProgress
})(InProgressReportsList);

export default connectedInProgressReportsList;

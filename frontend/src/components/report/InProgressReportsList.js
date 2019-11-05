import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import InProgressReportListItem from './InProgressReportListItem';
import { getAllInProgress } from '../../actions/reportsListActions';
import { Table, Grid, Container, Header } from 'semantic-ui-react';

const InProgressReportsList = props => {
  console.log(props);
  // useEffect(() => {
  //   props.getAllInProgress(props.login.id);
  // }, []);

  // if (props.reportsList.inProgress === null) {
  //   return <div>loading</div>;
  // }
  // if (props.reportsList.loading) {
  //   return <div>loading</div>;
  // }
  if (props.reportsList.inProgress.length === 0) {
    return (
      <Grid.Column>
        <Container>
          <Header>Omat keskeneräiset raportit</Header>
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
                <Table.Cell>Nimi</Table.Cell>
                <Table.Cell>Aika</Table.Cell>
                <Table.Cell>Nro</Table.Cell>
                <Table.Cell></Table.Cell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {props.reportsList.inProgress.map(r => (
                <InProgressReportListItem key={r.id} report={r} />
              ))}
            </Table.Body>
          </Table>
        </Container>
      </Grid.Column>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    reportsList: state.reportsList,
    login: state.login
  };
};

const connectedInProgressReportsList = connect(
  mapStateToProps,
  { getAllInProgress }
)(InProgressReportsList);

export default connectedInProgressReportsList;

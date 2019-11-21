import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ReportTransferOptions from './ReportTransferOptions';
import ReportTransferListItem from './ReportTransferListItem';
import { Container, Table, Dimmer, Loader } from 'semantic-ui-react';
import { getAllTransfers } from '../../actions/reportTransferActions';

const ReportTransferList = props => {
  console.log('report transfer list props', props);
  useEffect(() => {
    props.getAllTransfers();
    // eslint-disable-next-line
  }, [props.reportsList.lastReport]);

  if (props.reportsList.reportTransferList === null) {
    return (
      <Container>
        <Dimmer active inverted>
          <Loader size="medium">Ladataan...</Loader>
        </Dimmer>
      </Container>
    );
  }
  if (props.login.level === 3) {
    return (
      <Container>
        <h1>Siirtotiedostot</h1>
        <ReportTransferOptions />
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.Cell>Luontipäivämäärä</Table.Cell>
              <Table.Cell>Käyttäjä</Table.Cell>
              <Table.Cell>Raportin ajankohta</Table.Cell>
              <Table.Cell>Siirtotiedosto</Table.Cell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {props.reportsList.reportTransferList.map(item => (
              <ReportTransferListItem key={item.id} item={item} />
            ))}
          </Table.Body>
        </Table>
      </Container>
    );
  } else {
    return null;
  }
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
  getAllTransfers
};

const connectedReportTransferList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportTransferList);

export default connectedReportTransferList;

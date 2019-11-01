import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ReportTransferOptions from './ReportTransferOptions';
import ReportTransferListItem from './ReportTransferListItem';
import { Container, Table } from 'semantic-ui-react';
import { getAllTransfers } from '../../actions/reportTransferActions';

const ReportTransferList = props => {
  console.log('report transfer list props', props);
  useEffect(() => {
    props.getAllTransfers();
    // eslint-disable-next-line
  }, []);

  if (props.reportsList.reportTransferList === null) {
    return <div>loading</div>;
  }

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

        {props.reportsList.reportTransferList.map(item => (
          <ReportTransferListItem key={item.id} item={item} />
        ))}
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
  getAllTransfers
};

const connectedReportTransferList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportTransferList);

export default connectedReportTransferList;

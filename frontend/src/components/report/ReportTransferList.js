import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Table, Dimmer, Loader } from 'semantic-ui-react';
import ReportTransferOptions from './ReportTransferOptions';
import ReportTransferListItem from './ReportTransferListItem';
import { getAllTransfers } from '../../actions/reportTransferActions';

const ReportTransferList = ({ reportsList, login, getAllTransfersConnect }) => {
  useEffect(() => {
    getAllTransfersConnect();
    // eslint-disable-next-line
  }, [reportsList.lastReport]);

  if (reportsList.reportTransferList === null) {
    return (
      <Container>
        <Dimmer active inverted>
          <Loader size='medium'>Ladataan...</Loader>
        </Dimmer>
      </Container>
    );
  }
  if (login.level === 3) {
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
            {reportsList.reportTransferList.map(item => (
              <ReportTransferListItem key={item.id} item={item} />
            ))}
          </Table.Body>
        </Table>
      </Container>
    );
  }
  return null;
};

ReportTransferList.propTypes = {
  reportsList: PropTypes.shape({
    reportTransferList: PropTypes.arrayOf(
      PropTypes.shape({
        created_at: PropTypes.string,
        filename: PropTypes.string,
        first_name: PropTypes.string,
        id: PropTypes.number,
        last_name: PropTypes.string,
        period: PropTypes.string,
        status: PropTypes.number,
        updated_at: PropTypes.string,
        user_id: PropTypes.number,
        username: PropTypes.string
      })
    ),
    lastTransfer: PropTypes.shape({
      created_at: PropTypes.string,
      filename: PropTypes.string,
      id: PropTypes.number,
      period: PropTypes.string,
      status: PropTypes.number,
      updated_at: PropTypes.string,
      user_id: PropTypes.number
    })
  }),
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
  getAllTransfersConnect: PropTypes.func
};

const mapStateToProps = state => {
  return {
    reportsList: state.reportsList,
    login: state.login
  };
};

const mapDispatchToProps = {
  getAllTransfersConnect: getAllTransfers
};

const connectedReportTransferList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportTransferList);

export default connectedReportTransferList;

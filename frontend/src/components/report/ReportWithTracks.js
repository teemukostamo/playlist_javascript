import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Container, Table } from 'semantic-ui-react';
import { getOneReport, getReportDetails } from '../../actions/reportActions';
import ReportWithTracksItem from './ReportWithTracksItem';
import ReportDetails from './ReportDetails';

const ReportWithTracks = props => {
  // get report tracks by report id
  useEffect(() => {
    props.getOneReport(props.id);
    // eslint-disable-next-line
  }, []);
  // get report details by report id
  useEffect(() => {
    console.log('get details of report ', props.id);
    props.getReportDetails(props.id);
    // eslint-disable-next-line
  }, []);

  console.log(props.report.loading);

  if (props.report.report === null) {
    return <Container>loading</Container>;
  }

  return (
    <Container>
      <h3>Raportti</h3>
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.Cell>#</Table.Cell>
            <Table.Cell>Artisti</Table.Cell>
            <Table.Cell>Biisi</Table.Cell>
            <Table.Cell>Kesto</Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell></Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {props.report.report.map(track => (
            <ReportWithTracksItem key={track.track_id} track={track} />
          ))}
        </Table.Body>
      </Table>
      <ReportDetails report={props.report.reportDetails} />
    </Container>
  );
};

const mapStateToProps = state => {
  console.log('reportwithtracks state', state);
  return {
    report: state.report,
    reportsList: state.reportsList
  };
};

const connectedReportWithTracks = connect(
  mapStateToProps,
  { getOneReport, getReportDetails }
)(ReportWithTracks);

export default connectedReportWithTracks;

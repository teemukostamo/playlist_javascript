import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Table,
  Segment,
  Dimmer,
  Loader,
  Button,
  Header
} from 'semantic-ui-react';
import {
  getOneReport,
  getReportDetails,
  deleteChecked
} from '../../actions/reportActions';
import ReportWithTracksItem from './ReportWithTracksItem';
import ReportDetails from './ReportDetails';

const ReportWithTracks = props => {
  // get report tracks by report id
  useEffect(() => {
    setTimeout(() => {
      if (props.id === undefined) {
        props.getOneReport(props.report.reportDetails.id);
      } else {
        props.getOneReport(props.id);
      }
    }, 1000);
    // tää efekti uusiks sit kun hakutuloksista lisää biisin listaan
    // eslint-disable-next-line
  }, [props.report.djonline]);
  // get report details by report id
  useEffect(() => {
    if (props.id === undefined) {
      props.getReportDetails(props.report.reportDetails.id);
    } else {
      console.log('get details of report ', props.id);
      props.getReportDetails(props.id);
    }
    // eslint-disable-next-line
  }, []);

  const deleteChecked = () => {
    console.log('klikd delete checkd');
    props.deleteChecked(props.report.checkedForDelete, props.id);
  };

  console.log('report with tracks props', props);

  if (props.report.report === null) {
    return (
      <Segment>
        <Dimmer active inverted>
          <Loader inverted content="Ladataan..." />
        </Dimmer>
      </Segment>
    );
  }
  if (props.report.report.length === 0) {
    return (
      <Container>
        <Header>Ei lisättyjä kappaleita. Lisää biisit alta</Header>
        <ReportDetails report={props.report.reportDetails} />
      </Container>
    );
  }

  return (
    <Container>
      <h3>Raportti</h3>
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.Cell></Table.Cell>
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
            <ReportWithTracksItem key={track.report_track_id} track={track} />
          ))}
        </Table.Body>
      </Table>
      <Button onClick={deleteChecked} style={{ marginBottom: '2rem' }}>
        Poista valitut
      </Button>
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
  { getOneReport, getReportDetails, deleteChecked }
)(ReportWithTracks);

export default connectedReportWithTracks;

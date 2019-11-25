import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ReactDragListView from 'react-drag-listview/lib/index.js';
import {
  Container,
  Table,
  Dimmer,
  Loader,
  Button,
  Header
} from 'semantic-ui-react';
import {
  getOneReport,
  getReportDetails,
  deleteChecked,
  updateSortableRank
} from '../../actions/reportActions';
import { getOneTrack } from '../../actions/trackActions';
import ReportWithTracksItem from './ReportWithTracksItem';
import ReportDetails from './ReportDetails';

const ReportWithTracks = props => {
  const [dragState, setDragState] = useState(null);
  console.log(dragState);
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

  // fetch tracks after sorting changes
  useEffect(() => {
    console.log('array state changed', dragState);
    props.updateSortableRank(dragState, props.id);
    // eslint-disable-next-line
  }, [dragState]);

  // get track details after edit click
  // useEffect(() => {
  //   props.getOneTrack(props.report.editTrackId);
  // }, [props.report.editTrackId]);

  const array = props.report.report;
  console.log('array', array);

  const deleteChecked = () => {
    console.log('klikd delete checkd');

    let remainingTracks = props.report.report.filter(function(e) {
      return this.indexOf(e.report_track_id) < 0;
    }, props.report.checkedForDelete);
    console.log(remainingTracks);
    props.deleteChecked(
      props.report.checkedForDelete,
      props.id,
      remainingTracks
    );
  };

  const dragProps = {
    onDragEnd(fromIndex, toIndex) {
      console.log(dragState);
      const item = array.splice(fromIndex, 1)[0];
      console.log(item);
      console.log(dragState);
      array.splice(toIndex, 0, item);
      setDragState(array);
    },
    nodeSelector: 'tr',
    handleSelector: 'i.arrows'
  };

  console.log('report with tracks props', props);

  if (props.report.report === null || props.report.reportDetails === null) {
    return (
      <Dimmer active inverted>
        <Loader inverted content="Ladataan..." />
      </Dimmer>
    );
  }
  if (props.report.loading) {
    return (
      <Dimmer active inverted>
        <Loader inverted content="Ladataan..." />
      </Dimmer>
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
  if (
    props.login.level === 1 &&
    props.login.id !== props.report.reportDetails.user_id
  ) {
    return null;
  } else {
    return (
      <Container>
        <h3>Raportti</h3>
        <ReactDragListView {...dragProps}>
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
                <ReportWithTracksItem
                  key={track.report_track_id}
                  track={track}
                />
              ))}
            </Table.Body>
            <Table.Footer>
              <Table.Row></Table.Row>
            </Table.Footer>
          </Table>
        </ReactDragListView>

        <Button
          color="red"
          onClick={deleteChecked}
          style={{
            marginLeft: '1rem',
            marginBottom: '1rem',
            marginTop: '1rem'
          }}
        >
          Poista valitut
        </Button>
        <ReportDetails report={props.report.reportDetails} />
      </Container>
    );
  }
};

const mapStateToProps = state => {
  console.log('reportwithtracks state', state);
  return {
    report: state.report,
    reportsList: state.reportsList,
    login: state.login
  };
};

const connectedReportWithTracks = connect(mapStateToProps, {
  getOneReport,
  getReportDetails,
  getOneTrack,
  deleteChecked,
  updateSortableRank
})(ReportWithTracks);

export default connectedReportWithTracks;

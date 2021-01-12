import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactDragListView from 'react-drag-listview/lib/index.js';
import {
  Container,
  Table,
  Dimmer,
  Loader,
  Button,
  Header,
} from 'semantic-ui-react';
import {
  getOneReport,
  getReportDetails,
  deleteChecked,
  updateSortableRank,
} from '../../actions/reportActions';
import ReportWithTracksItem from './ReportWithTracksItem';
import ReportDetails from './ReportDetails';

const ReportWithTracks = ({
  report,
  login,
  id,
  getOneReportConnect,
  getReportDetailsConnect,
  deleteCheckedConnect,
  updateSortableRankConnect,
}) => {
  const [dragState, setDragState] = useState(null);
  // get report tracks by report id
  useEffect(() => {
    const timer = setTimeout(() => {
      getOneReportConnect(parseInt(id));
    }, 500);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line
  }, [report.djonline]);

  // get report details by report id
  useEffect(() => {
    if (id === undefined) {
      getReportDetailsConnect(report.reportDetails.id);
    } else {
      getReportDetailsConnect(id);
    }
    // eslint-disable-next-line
  }, []);

  // fetch tracks after sorting changes
  useEffect(() => {
    updateSortableRankConnect(dragState, id);
    // eslint-disable-next-line
  }, [dragState]);

  const array = report.report;

  const clickDeleteChecked = () => {
    const remainingTracks = report.report.filter(function(e) {
      return this.indexOf(e.report_track_id) < 0;
    }, report.checkedForDelete);
    deleteCheckedConnect(report.checkedForDelete, id, remainingTracks);
  };

  const dragProps = {
    onDragEnd(fromIndex, toIndex) {
      const item = array.splice(fromIndex, 1)[0];
      array.splice(toIndex, 0, item);
      setDragState(array);
    },
    nodeSelector: 'tr',
    handleSelector: 'i.arrows',
  };

  if (report.report === null || report.reportDetails === null) {
    return (
      <Dimmer active inverted>
        <Loader inverted content='Ladataan...' />
      </Dimmer>
    );
  }
  if (report.loading) {
    return (
      <Dimmer active inverted>
        <Loader inverted content='Ladataan...' />
      </Dimmer>
    );
  }
  if (report.report.length === 0) {
    return (
      <Container>
        <Header>Ei lisättyjä kappaleita. Lisää biisit alta</Header>
        <ReportDetails report={report.reportDetails} />
      </Container>
    );
  }
  if (login.level === 1 && login.id !== report.reportDetails.user_id) {
    return null;
  }
  return (
    <Container>
      <h3>Raportti</h3>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <ReactDragListView {...dragProps}>
        <Table striped>
          <Table.Header>
            <Table.Row>
              <Table.Cell />
              <Table.Cell>#</Table.Cell>
              <Table.Cell>Artisti</Table.Cell>
              <Table.Cell>Biisi</Table.Cell>
              <Table.Cell>Kesto</Table.Cell>
              <Table.Cell />
              <Table.Cell />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {report.report.map((track) => (
              <ReportWithTracksItem key={track.report_track_id} track={track} />
            ))}
          </Table.Body>
          <Table.Footer>
            <Table.Row />
          </Table.Footer>
        </Table>
      </ReactDragListView>

      <Button
        color='red'
        onClick={clickDeleteChecked}
        style={{
          marginLeft: '1rem',
          marginBottom: '1rem',
          marginTop: '1rem',
        }}
      >
        Poista valitut
      </Button>
      <ReportDetails report={report.reportDetails} />
    </Container>
  );
};

ReportWithTracks.propTypes = {
  id: PropTypes.string.isRequired,
  deleteCheckedConnect: PropTypes.func,
  getOneReportConnect: PropTypes.func,
  getReportDetailsConnect: PropTypes.func,
  updateSortableRankConnect: PropTypes.func,
  login: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    id: PropTypes.number,
    level: PropTypes.number,
    loading: PropTypes.bool,
    status: PropTypes.number,
    token: PropTypes.string,
    username: PropTypes.string,
  }),
  report: PropTypes.shape({
    checkedForDelete: PropTypes.array,
    reportDetails: PropTypes.shape({
      program_name: PropTypes.string,
      program_no: PropTypes.number,
      program_dj: PropTypes.string,
      program_date: PropTypes.string,
      program_start_time: PropTypes.string,
      program_end_time: PropTypes.string,
      id: PropTypes.number,
      program_id: PropTypes.number,
      rerun: PropTypes.number,
      status: PropTypes.number,
      user_id: PropTypes.number,
      username: PropTypes.string,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
    }),
    djonline: PropTypes.arrayOf(
      PropTypes.shape({
        album_id: PropTypes.number,
        album_name: PropTypes.string,
        artist_id: PropTypes.number,
        artist_name: PropTypes.string,
        cat_id: PropTypes.string,
        country: PropTypes.number,
        disc_no: PropTypes.string,
        isrc: PropTypes.string,
        label: PropTypes.string,
        length: PropTypes.number,
        record_country: PropTypes.string,
        report_id: PropTypes.number,
        report_track_id: PropTypes.number,
        sortable_rank: PropTypes.number,
        spotify_id: PropTypes.string,
        track_no: PropTypes.string,
        track_title: PropTypes.string,
        user_id: PropTypes.number,
        year: PropTypes.string,
      })
    ),
    // report: PropTypes.arrayOf(
    //   PropTypes.shape({
    //     album_id: PropTypes.number,
    //     album_name: PropTypes.string,
    //     artist_id: PropTypes.number,
    //     artist_name: PropTypes.string,
    //     cat_id: PropTypes.string,
    //     country: PropTypes.number,
    //     disc_no: PropTypes.number,
    //     isrc: PropTypes.string,
    //     label: PropTypes.string,
    //     length: PropTypes.number,
    //     record_country: PropTypes.string,
    //     report_id: PropTypes.number,
    //     report_track_id: PropTypes.number,
    //     sortable_rank: PropTypes.number,
    //     spotify_id: PropTypes.string,
    //     track_no: PropTypes.number,
    //     track_title: PropTypes.string,
    //     year: PropTypes.string
    //   })
    // ),
    report: PropTypes.array,
    loading: PropTypes.bool,
  }),
};

const mapStateToProps = (state) => {
  return {
    report: state.report,
    reportsList: state.reportsList,
    login: state.login,
  };
};

const connectedReportWithTracks = connect(mapStateToProps, {
  getOneReportConnect: getOneReport,
  getReportDetailsConnect: getReportDetails,
  deleteCheckedConnect: deleteChecked,
  updateSortableRankConnect: updateSortableRank,
})(ReportWithTracks);

export default connectedReportWithTracks;

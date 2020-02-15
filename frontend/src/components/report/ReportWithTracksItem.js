import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Icon, Checkbox } from 'semantic-ui-react';
import EditTrackModal from '../track/EditTrackModal';
import {
  deleteTrackFromReport,
  checkForDelete,
  unCheckForDelete
} from '../../actions/reportActions';

const ReportWithTracksItem = ({
  report,
  track,
  deleteTrackFromReport,
  checkForDelete,
  unCheckForDelete
}) => {
  const [checked, setChecked] = useState(false);
  const onDelete = () => {
    const remainingTracks = report.report.filter(
      t => t.report_track_id !== track.report_track_id
    );
    const params = {
      report_track_id: track.report_track_id,
      report_id: report.reportDetails.id,
      remainingTracks
    };
    deleteTrackFromReport(params);
  };

  const checkedClick = () => {
    setChecked(!checked);
    if (checked === true) {
      unCheckForDelete(track.report_track_id);
    } else {
      checkForDelete(track.report_track_id);
    }
  };
  let minutes = Math.floor(track.length / 60);
  minutes = minutes.toString();
  let seconds = track.length - minutes * 60;
  if (seconds.toString().length === 1) {
    seconds = `0${seconds.toString()}`;
  }
  seconds = seconds.toString();

  return (
    <Table.Row>
      <Table.Cell>
        <Checkbox onChange={checkedClick} checked={checked} />
        <Icon
          style={{ marginLeft: '1.5rem', cursor: 'pointer' }}
          name='arrows alternate'
        />
      </Table.Cell>
      <Table.Cell>{track.sortable_rank}</Table.Cell>
      <Table.Cell>{track.artist_name}</Table.Cell>
      <Table.Cell>{track.track_title}</Table.Cell>
      <Table.Cell>
        {minutes}:{seconds}
      </Table.Cell>
      <Table.Cell>
        <Icon
          style={{ cursor: 'pointer' }}
          color='red'
          onClick={onDelete}
          name='delete'
        />
      </Table.Cell>
      <Table.Cell>
        <EditTrackModal
          id={track.track_id}
          sortable_rank={track.sortable_rank}
          report_track_id={track.report_track_id}
          track={track}
        />
      </Table.Cell>
    </Table.Row>
  );
};

ReportWithTracksItem.propTypes = {
  deleteTrackFromReport: PropTypes.func,
  checkForDelete: PropTypes.func,
  unCheckForDelete: PropTypes.func,
  track: PropTypes.shape({
    album_id: PropTypes.number,
    album_name: PropTypes.string,
    artist_id: PropTypes.number,
    artist_name: PropTypes.string,
    cat_id: PropTypes.string,
    country: PropTypes.number,
    disc_no: PropTypes.number,
    isrc: PropTypes.string,
    label: PropTypes.string,
    length: PropTypes.number,
    people: PropTypes.string,
    record_country: PropTypes.string,
    report_track_id: PropTypes.number,
    sortable_rank: PropTypes.number,
    track_id: PropTypes.number,
    track_no: PropTypes.number,
    track_title: PropTypes.string,
    year: PropTypes.string
  }),
  report: PropTypes.shape({
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
      last_name: PropTypes.string
    }),
    report: PropTypes.arrayOf(
      PropTypes.shape({
        album_id: PropTypes.number,
        album_name: PropTypes.string,
        artist_id: PropTypes.number,
        artist_name: PropTypes.string,
        cat_id: PropTypes.string,
        country: PropTypes.number,
        disc_no: PropTypes.number,
        isrc: PropTypes.string,
        label: PropTypes.string,
        length: PropTypes.number,
        record_country: PropTypes.string,
        report_id: PropTypes.number,
        report_track_id: PropTypes.number,
        sortable_rank: PropTypes.number,
        spotify_id: PropTypes.string,
        track_no: PropTypes.number,
        track_title: PropTypes.string,
        year: PropTypes.string
      })
    )
  })
};

const mapStateToProps = state => {
  return {
    report: state.report
  };
};

const connectedReportWithTracksItem = connect(mapStateToProps, {
  deleteTrackFromReport,
  checkForDelete,
  unCheckForDelete
})(ReportWithTracksItem);

export default connectedReportWithTracksItem;

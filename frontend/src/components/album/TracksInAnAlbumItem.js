import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table } from 'semantic-ui-react';
import MergeAlbumTracksModal from './MergeAlbumTracksModal';

const TracksInAnAlbumItem = ({ track }) => {
  return (
    <Table.Row>
      <Table.Cell>
        <MergeAlbumTracksModal
          track_id={track.track_id}
          track_title={track.track_title}
        />
      </Table.Cell>
      <Table.Cell>
        <Link to={`/track/${track.track_id}`}>
          {track.artist_name} - {track.track_title}{' '}
        </Link>
      </Table.Cell>
      <Table.Cell>
        {track.track_no} / {track.disc_no}
      </Table.Cell>
      <Table.Cell>{track.isrc}</Table.Cell>
      <Table.Cell>{track.report_occurrence}</Table.Cell>
      <Table.Cell></Table.Cell>
    </Table.Row>
  );
};

TracksInAnAlbumItem.propTypes = {
  track: PropTypes.shape({
    track_id: PropTypes.number,
    track_title: PropTypes.string,
    artist_name: PropTypes.string,
    track_no: PropTypes.number,
    disc_no: PropTypes.number,
    isrc: PropTypes.string,
    report_occurrence: PropTypes.number
  }).isRequired
};

export default TracksInAnAlbumItem;

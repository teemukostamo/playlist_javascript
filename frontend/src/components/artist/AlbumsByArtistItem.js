import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table } from 'semantic-ui-react';
import MergeAlbumsModal from './MergeAlbumsModal';

const AlbumsByArtistItem = ({ album }) => {
  return (
    <Table.Row>
      <Table.Cell>
        <MergeAlbumsModal album_name={album.name} album_id={album.album_id} />
      </Table.Cell>
      <Table.Cell>
        <Link to={`/album/${album.album_id}`}>{album.name}</Link>
      </Table.Cell>
      <Table.Cell>{album.identifier}</Table.Cell>
      <Table.Cell>{album.track_count}</Table.Cell>
      <Table.Cell>{album.report_occurrence}</Table.Cell>
    </Table.Row>
  );
};

AlbumsByArtistItem.propTypes = {
  album: PropTypes.shape({
    album_id: PropTypes.number,
    artist_id: PropTypes.number,
    name: PropTypes.string,
    identifier: PropTypes.string,
    artist_name: PropTypes.string,
    artist_spotify_id: PropTypes.string,
    track_count: PropTypes.number,
    report_occurrence: PropTypes.number
  }).isRequired
};

export default AlbumsByArtistItem;

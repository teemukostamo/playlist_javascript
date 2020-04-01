import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import AlbumsByArtistItem from './AlbumsByArtistItem';

const AlbumsByArtist = ({ albumList }) => {
  if (albumList === null) {
    return <span>loading</span>;
  }
  return (
    <React.Fragment>
      <h4>Albumit</h4>
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.Cell>ID#</Table.Cell>
            <Table.Cell>Nimi</Table.Cell>
            <Table.Cell>Levykoodi</Table.Cell>
            <Table.Cell>Biisejä</Table.Cell>
            <Table.Cell>Raportit</Table.Cell>
            <Table.Cell></Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {albumList.map(album => (
            <AlbumsByArtistItem key={album.album_id} album={album} />
          ))}
        </Table.Body>
      </Table>
    </React.Fragment>
  );
};

AlbumsByArtist.propTypes = {
  albumList: PropTypes.arrayOf(
    PropTypes.shape({
      album_id: PropTypes.number,
      artist_id: PropTypes.number,
      name: PropTypes.string,
      identifier: PropTypes.string,
      artist_name: PropTypes.string,
      artist_spotify_id: PropTypes.string,
      track_count: PropTypes.number,
      report_occurrence: PropTypes.number
    })
  )
};

export default AlbumsByArtist;

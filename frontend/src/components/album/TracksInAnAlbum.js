import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import TracksInAnAlbumItem from './TracksInAnAlbumItem';

const TracksInAnAlbum = ({ tracklist }) => {
  if (tracklist === null) {
    return <span>loading</span>;
  }
  return (
    <React.Fragment>
      <h4>Biisit</h4>
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.Cell>ID#</Table.Cell>
            <Table.Cell>ESITTÄJÄ - Biisi</Table.Cell>
            <Table.Cell>Biisi# / Levy#</Table.Cell>
            <Table.Cell>ISRC</Table.Cell>
            <Table.Cell>Raportit</Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {tracklist.map(track => (
            <TracksInAnAlbumItem key={track.track_id} track={track} />
          ))}
        </Table.Body>
      </Table>
    </React.Fragment>
  );
};

TracksInAnAlbum.propTypes = {
  tracklist: PropTypes.arrayOf(
    PropTypes.shape({
      track_id: PropTypes.number,
      track_title: PropTypes.string,
      artist_name: PropTypes.string,
      track_no: PropTypes.number,
      disc_no: PropTypes.number,
      isrc: PropTypes.string,
      report_occurrence: PropTypes.number
    })
  )
};

export default TracksInAnAlbum;

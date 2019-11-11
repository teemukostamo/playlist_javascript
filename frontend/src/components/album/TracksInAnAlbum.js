import React from 'react';
import { Table } from 'semantic-ui-react';
import TracksInAnAlbumItem from './TracksInAnAlbumItem';

const TracksInAnAlbum = props => {
  console.log('albumbyartist props', props);
  if (props.tracklist === null) {
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
          {props.tracklist.map(track => (
            <TracksInAnAlbumItem key={track.track_id} track={track} />
          ))}
        </Table.Body>
      </Table>
    </React.Fragment>
  );
};

export default TracksInAnAlbum;

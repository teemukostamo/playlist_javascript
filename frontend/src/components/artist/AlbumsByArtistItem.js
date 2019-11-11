import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'semantic-ui-react';

const AlbumsByArtistItem = props => {
  console.log(props);
  return (
    <Table.Row>
      <Table.Cell>{props.album.album_id}</Table.Cell>
      <Table.Cell>
        <Link to={`/album/${props.album.album_id}`}>{props.album.name}</Link>
      </Table.Cell>
      <Table.Cell>{props.album.identifier}</Table.Cell>
      <Table.Cell>{props.album.track_count}</Table.Cell>
      <Table.Cell>{props.album.report_occurrence}</Table.Cell>
    </Table.Row>
  );
};

export default AlbumsByArtistItem;

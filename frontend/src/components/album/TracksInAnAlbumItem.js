import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'semantic-ui-react';

const TracksInAnAlbumItem = props => {
  console.log(props);
  return (
    <Table.Row>
      <Table.Cell>{props.track.track_id}</Table.Cell>
      <Table.Cell>
        <Link to={`/track/${props.track.track_id}`}>
          {props.track.artist_name} - {props.track.track_title}{' '}
        </Link>
      </Table.Cell>
      <Table.Cell>
        {props.track.track_no} / {props.track.disc_no}
      </Table.Cell>
      <Table.Cell>{props.track.isrc}</Table.Cell>
      <Table.Cell>{props.track.report_occurrence}</Table.Cell>
      <Table.Cell></Table.Cell>
    </Table.Row>
  );
};

export default TracksInAnAlbumItem;

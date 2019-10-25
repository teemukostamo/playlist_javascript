import React from 'react';
import { Table, Icon } from 'semantic-ui-react';

const ReportWithTracksItem = props => {
  const onDelete = () => {
    console.log('klikd delete');
  };
  const onEdit = () => {
    console.log('klikd edit');
  };
  const minutes = Math.floor(props.track.length / 60);
  const seconds = props.track.length - minutes * 60;

  return (
    <Table.Row>
      <Table.Cell>{props.track.sortable_rank}</Table.Cell>
      <Table.Cell>{props.track.artist_name}</Table.Cell>
      <Table.Cell>{props.track.track_title}</Table.Cell>
      <Table.Cell>
        {minutes}:{seconds}
      </Table.Cell>
      <Table.Cell>
        <Icon onClick={onDelete} name="delete" />
      </Table.Cell>
      <Table.Cell>
        <Icon onClick={onEdit} name="edit" />
      </Table.Cell>
    </Table.Row>
  );
};

export default ReportWithTracksItem;

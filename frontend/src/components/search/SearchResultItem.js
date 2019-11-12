import React from 'react';
import { Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const SearchResultItem = props => {
  if (props.result === null) {
    return null;
  }
  return (
    <Table.Row>
      <Table.Cell>
        <Link to={`../artist/${props.result.artist_id}`}>
          {props.result.artist_name}
        </Link>
      </Table.Cell>
      <Table.Cell>
        <Link to={`../album/${props.result.album_id}`}>
          {props.result.album_name}
        </Link>
      </Table.Cell>
      <Table.Cell>
        <Link to={`../track/${props.result.track_id}`}>
          {props.result.track_title}
        </Link>
      </Table.Cell>
      <Table.Cell>
        <Link to={`../reports/${props.result.report_id}`}>
          {props.result.program_date}
        </Link>
      </Table.Cell>
    </Table.Row>
  );
};

export default SearchResultItem;

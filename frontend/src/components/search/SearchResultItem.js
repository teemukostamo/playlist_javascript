import React from 'react';
import { Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import MergeArtists from './MergeArtists';
import MergeAlbums from './MergeAlbums';
import MergeTracks from './MergeTracks';

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
        <MergeArtists
          artist_id={props.result.artist_id}
          artist_name={props.result.artist_name}
        />
      </Table.Cell>
      <Table.Cell>
        <Link to={`../album/${props.result.album_id}`}>
          {props.result.album_name}
        </Link>
        <MergeAlbums
          album_id={props.result.album_id}
          album_name={props.result.album_name}
        />
      </Table.Cell>
      <Table.Cell>
        <Link to={`../track/${props.result.track_id}`}>
          {props.result.track_title}
        </Link>
        <MergeTracks
          track_id={props.result.track_id}
          track_title={props.result.track_title}
        />
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

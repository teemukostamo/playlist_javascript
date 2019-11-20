import React from 'react';
import { connect } from 'react-redux';
import { Table, Loader, Dimmer } from 'semantic-ui-react';
import SearchResultItem from './SearchResultItem';
import SortResults from './SortResults';

const SearchResults = props => {
  console.log('search result props', props);
  if (props.search.advancedResults === null) {
    return null;
  }
  if (props.search.loading === true) {
    return (
      <Dimmer active>
        <Loader>ladataan...</Loader>
      </Dimmer>
    );
  }
  let resultsToShow = props.search.advancedResults;

  resultsToShow =
    props.search.sortAdvancedResults === 2
      ? resultsToShow
      : resultsToShow.sort((a, b) =>
          a.track_title > b.track_title
            ? 1
            : b.track_title > a.track_title
            ? -1
            : 0
        );

  resultsToShow =
    props.search.sortAdvancedResults === 1
      ? resultsToShow
      : resultsToShow.sort((a, b) =>
          a.artist_name > b.artist_name
            ? 1
            : b.artist_name > a.artist_name
            ? -1
            : 0
        );

  // objs.sort((a, b) =>
  //   a.last_nom > b.last_nom ? 1 : b.last_nom > a.last_nom ? -1 : 0
  // );

  return (
    <div style={{ marginTop: '2rem' }}>
      <SortResults />
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.Cell>Esittäjä</Table.Cell>
            <Table.Cell>Albumi</Table.Cell>
            <Table.Cell>Biisi</Table.Cell>
            <Table.Cell>Soinut viimeksi</Table.Cell>
            <Table.Cell></Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {resultsToShow.map(result => (
            <SearchResultItem key={result.track_id} result={result} />
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

const mapStateToProps = state => {
  console.log('search results state', state);
  return {
    search: state.search
  };
};

const connectedSearchResults = connect(mapStateToProps, null)(SearchResults);

export default connectedSearchResults;

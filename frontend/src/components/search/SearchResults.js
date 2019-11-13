import React from 'react';
import { connect } from 'react-redux';
import { Table, Loader, Dimmer } from 'semantic-ui-react';
import SearchResultItem from './SearchResultItem';

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
  return (
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
        {props.search.advancedResults.map(result => (
          <SearchResultItem key={result.track_id} result={result} />
        ))}
      </Table.Body>
    </Table>
  );
};

const mapStateToProps = state => {
  console.log('search results state', state);
  return {
    search: state.search
  };
};

const connectedSearchResults = connect(
  mapStateToProps,
  null
)(SearchResults);

export default connectedSearchResults;

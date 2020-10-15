/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Loader, Dimmer } from 'semantic-ui-react';
import SearchResultItem from './SearchResultItem';
import SortResults from './SortResults';

const SearchResults = ({ search }) => {
  if (search.advancedResults === null) {
    return null;
  }
  if (search.loading === true) {
    return (
      <Dimmer active>
        <Loader>ladataan...</Loader>
      </Dimmer>
    );
  }
  let resultsToShow = search.advancedResults;

  resultsToShow =
    search.sortAdvancedResults === 2
      ? resultsToShow
      : resultsToShow.sort((a, b) =>
          a.track_title > b.track_title
            ? 1
            : b.track_title > a.track_title
            ? -1
            : 0
        );

  resultsToShow =
    search.sortAdvancedResults === 1
      ? resultsToShow
      : resultsToShow.sort((a, b) =>
          a.artist_name > b.artist_name
            ? 1
            : b.artist_name > a.artist_name
            ? -1
            : 0
        );

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
          {resultsToShow.map((result) => (
            <SearchResultItem key={result.track_id} result={result} />
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

SearchResults.propTypes = {
  search: PropTypes.shape({
    advancedResults: PropTypes.arrayOf(
      PropTypes.shape({
        album_id: PropTypes.number,
        album_name: PropTypes.string,
        artist_id: PropTypes.number,
        artist_name: PropTypes.string,
        length: PropTypes.number,
        program_date: PropTypes.string,
        report_id: PropTypes.number,
        track_id: PropTypes.number,
        track_title: PropTypes.string,
      })
    ),
    loading: PropTypes.bool,
    sortAdvancedResults: PropTypes.number,
  }),
};

const mapStateToProps = (state) => {
  return {
    search: state.search,
  };
};

const connectedSearchResults = connect(mapStateToProps, null)(SearchResults);

export default connectedSearchResults;

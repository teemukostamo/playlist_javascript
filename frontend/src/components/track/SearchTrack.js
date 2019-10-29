import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Search, Button } from 'semantic-ui-react';
import { getAutocompleteResults } from '../../actions/searchActions';
import { addTrackToReport } from '../../actions/reportActions';

const SearchTrack = ({
  search,
  report,
  getAutocompleteResults,
  addTrackToReport
}) => {
  console.log('search track props', search);
  const [searchQuery, setSearchQuery] = useState('');
  const [trackToSave, setTrackToSave] = useState(null);
  console.log(searchQuery);

  // useEffect(() => {
  //   if (searchQuery.length >= 3) {
  //     setTimeout(() => {
  //       getAutocompleteResults(searchQuery);
  //     }, 100);
  //   }
  //   // eslint-disable-next-line
  // }, [searchQuery]);

  const handleResultSelect = (e, { result }) => {
    const trackToSave = {
      track_id: result.value,
      report_id: report.reportDetails.id,
      length: result.length,
      sortable_rank: report.report.length + 1
    };
    console.log('handling result select', trackToSave);
    setTrackToSave(trackToSave);
  };

  const saveClick = () => {
    console.log('klikd save', trackToSave);
    addTrackToReport(trackToSave);
  };

  const onSearchChange = (e, { value }) => {
    setSearchQuery(value);
    if (searchQuery.length >= 3) {
      setTimeout(() => {
        getAutocompleteResults(searchQuery);
      }, 300);
    }
  };

  let results = search.searchResults.map(result => ({
    key: result.track_id,
    title: result.track_title + ' ' + result.artist,
    length: result.length,
    value: result.track_id
  }));

  return (
    <Form>
      <Form.Group widths="equal">
        <Search
          style={{ overflow: 'auto', height: '80%' }}
          loading={search.loading}
          onResultSelect={handleResultSelect}
          onSearchChange={onSearchChange}
          results={results}
          // value={value}
        />
        <Button onClick={saveClick}>Lisää biisi raporttiin</Button>
        <Button>Lisää uusi biisi</Button>
        {/* <input type="text" onChange={e => setSearchQuery(e.target.value)} /> */}
      </Form.Group>
    </Form>
  );
};

const mapStateToProps = state => {
  console.log('search track state to props', state);
  return {
    search: state.search,
    report: state.report
  };
};
const connectedSearchTrack = connect(
  mapStateToProps,
  { getAutocompleteResults, addTrackToReport }
)(SearchTrack);

export default connectedSearchTrack;

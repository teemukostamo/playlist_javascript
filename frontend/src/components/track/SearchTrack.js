import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Form, Search, Button, Grid, Header } from 'semantic-ui-react';
import { getAutocompleteResults } from '../../actions/searchActions';
import { addTrackToReport } from '../../actions/reportActions';
import AddTrackModal from './AddTrackModal';
import { useSearchTracksHook } from '../../hooks/searchTracksHook';

const SearchTrack = ({ report, addTrackToReport }) => {
  const [trackToSave, setTrackToSave] = useState(null);
  const { inputText, setInputText, search } = useSearchTracksHook();

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
    setTrackToSave(null);
  };

  // const onSearchChange = (e, { value }) => {
  //   setInputText(value);
  // };
  let results;
  if (search.result === undefined) {
    results = [];
  } else {
    results = search.result.map(result => ({
      key: result.track_id,
      title: result.track_title,
      description: `${result.artist}: ${result.album}`,
      length: result.length,
      value: result.track_id
    }));
  }

  return (
    <div style={{ marginLeft: '1rem', marginBottom: '1rem' }}>
      <Grid divided="vertically">
        <Grid.Row columns="2">
          <Form>
            <Header>Hae</Header>
            <Form.Group widths="equal">
              <Form.Field>
                <Search
                  loading={search.loading}
                  onResultSelect={handleResultSelect}
                  onSearchChange={e => setInputText(e.target.value)}
                  onSelectionChange={handleResultSelect}
                  results={results}
                  style={{ cursor: 'pointer' }}
                />
              </Form.Field>
              <Form.Field>
                <Button color="green" onClick={saveClick}>
                  Lisää biisi raporttiin
                </Button>
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
                {' '}
                <Button color="blue">Tarkennettu haku</Button>
              </Form.Field>
              <Form.Field>
                {' '}
                <AddTrackModal />
              </Form.Field>
            </Form.Group>
          </Form>
        </Grid.Row>
      </Grid>
    </div>
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

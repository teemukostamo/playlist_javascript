import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Search, Button, Grid, Header } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { getAutocompleteResults } from '../../actions/searchActions';
import { addTrackToReport } from '../../actions/reportActions';
import { setNotification } from '../../reducers/notificationReducer';
import AddTrackModal from './AddTrackModal';
import { useSearchTracksHook } from '../../hooks/searchTracksHook';

const SearchTrack = ({ report, addTrackToReport, setNotification }) => {
  const [trackToSave, setTrackToSave] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const { setInputText, search } = useSearchTracksHook();

  const handleResultSelect = (e, { result }) => {
    const newTrackToReport = {
      track_id: result.value,
      report_id: report.reportDetails.id,
      length: result.length,
      sortable_rank: report.report.length + 1
    };
    setTrackToSave(newTrackToReport);
  };

  const saveClick = () => {
    if (!trackToSave) {
      setNotification('Valitse biisi!', 'fail');
    } else {
      addTrackToReport(trackToSave);
      setTrackToSave(null);
    }
  };

  const goToAdvancedSearch = () => {
    setRedirect(true);
  };

  let results;
  if (search.result === undefined) {
    results = [];
  } else {
    results = search.result.map(result => ({
      key: result.track_id,
      title: result.track_title,
      description: `${result.artist}:
                    ${result.album}`,
      length: result.length,
      value: result.track_id
    }));
  }

  if (redirect) {
    return <Redirect to='/search' />;
  }

  return (
    <div style={{ marginLeft: '1rem', marginBottom: '1rem' }}>
      <Grid divided='vertically'>
        <Grid.Row columns='2'>
          <Form>
            <Header>Hae</Header>
            <Form.Group widths='equal'>
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
                <Button color='green' onClick={saveClick}>
                  Lisää biisi raporttiin
                </Button>
              </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field>
                {' '}
                <Button onClick={goToAdvancedSearch} color='blue'>
                  Tarkennettu haku
                </Button>
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

SearchTrack.propTypes = {
  report: PropTypes.shape({
    reportDetails: PropTypes.shape({
      id: PropTypes.number
    }),
    report: PropTypes.array
  }),
  addTrackToReport: PropTypes.func,
  setNotification: PropTypes.func
};

const mapStateToProps = state => {
  return {
    report: state.report
  };
};
const connectedSearchTrack = connect(mapStateToProps, {
  getAutocompleteResults,
  addTrackToReport,
  setNotification
})(SearchTrack);

export default connectedSearchTrack;

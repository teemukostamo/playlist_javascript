import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Dimmer, Loader } from 'semantic-ui-react';
import TrackDetailsForm from './TrackDetailsForm';
import PlayHistory from './PlayHistory';
import { getOneTrack, getOneTrackHistory } from '../../actions/trackActions';

const TrackDetails = ({ track, id, getOneTrack, getOneTrackHistory }) => {
  useEffect(() => {
    getOneTrackHistory(parseInt(id));
    getOneTrack(parseInt(id));
    // eslint-disable-next-line
  }, []);

  if (track.currentTrack === null || track.playhistory === null) {
    return (
      <Container>
        <Dimmer>
          <Loader>Ladataan...</Loader>
        </Dimmer>
      </Container>
    );
  }

  return (
    <Container>
      <TrackDetailsForm currentTrack={track.currentTrack[0]} />
      <PlayHistory playhistory={track.playhistory} />
    </Container>
  );
};

TrackDetails.propTypes = {
  id: PropTypes.string,
  track: PropTypes.shape({
    currentTrack: PropTypes.arrayOf(
      PropTypes.shape({
        track_id: PropTypes.number
      })
    ),
    playhistory: PropTypes.arrayOf(
      PropTypes.shape({
        program_name: PropTypes.string,
        program_date: PropTypes.string,
        program_id: PropTypes.number,
        report_id: PropTypes.number,
        track_id: PropTypes.number
      })
    )
  }),
  getOneTrack: PropTypes.func,
  getOneTrackHistory: PropTypes.func
};

const mapStateToProps = state => {
  return {
    track: state.track
  };
};

const connectedTrackDetails = connect(mapStateToProps, {
  getOneTrack,
  getOneTrackHistory
})(TrackDetails);
export default connectedTrackDetails;

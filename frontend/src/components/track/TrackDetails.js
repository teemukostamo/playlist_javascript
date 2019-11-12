import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Container, Dimmer, Loader } from 'semantic-ui-react';
import TrackDetailsForm from './TrackDetailsForm';
import PlayHistory from './PlayHistory';
import { getOneTrack, getOneTrackHistory } from '../../actions/trackActions';

const TrackDetails = props => {
  console.log('track detail props', props);
  useEffect(() => {
    props.getOneTrack(props.id);
    props.getOneTrackHistory(props.id);
    // eslint-disable-next-line
  }, []);
  if (props.track.currentTrack === null || props.track.playhistory === null) {
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
      <TrackDetailsForm currentTrack={props.track.currentTrack[0]} />
      <PlayHistory playhistory={props.track.playhistory} />
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    track: state.track
  };
};

const connectedTrackDetails = connect(
  mapStateToProps,
  { getOneTrack, getOneTrackHistory }
)(TrackDetails);
export default connectedTrackDetails;

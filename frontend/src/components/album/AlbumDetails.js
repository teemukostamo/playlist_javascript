import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Container, Dimmer, Loader } from 'semantic-ui-react';
import AlbumDetailsForm from './AlbumDetailsForm';
import { getOneAlbum } from '../../actions/albumActions';
import TracksInAnAlbum from './TracksInAnAlbum';
import PropTypes from 'prop-types';

const AlbumDetails = props => {
  console.log('album detail props', props);

  useEffect(() => {
    props.getOneAlbum(props.id);
    // eslint-disable-next-line
  }, [props.id]);

  if (props.album.currentAlbum === null) {
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
      <AlbumDetailsForm
        album_id={props.id}
        currentAlbum={props.album.currentAlbum}
      />
      <TracksInAnAlbum tracklist={props.album.tracklist} />
    </Container>
  );
};

const mapStateToProps = state => ({
  album: state.album
});

AlbumDetails.propTypes = {
  id: PropTypes.number
};

const connectedAlbumDetails = connect(mapStateToProps, { getOneAlbum })(
  AlbumDetails
);
export default connectedAlbumDetails;

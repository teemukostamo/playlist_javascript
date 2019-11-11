import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Container, Dimmer, Loader } from 'semantic-ui-react';
import AlbumDetailsForm from './AlbumDetailsForm';
import { getOneAlbum } from '../../actions/albumActions';

import TracksInAnAlbum from './TracksInAnAlbum';

const AlbumDetails = props => {
  console.log('album detail props', props);

  useEffect(() => {
    props.getOneAlbum(props.id);
  }, []);

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
      <AlbumDetailsForm currentAlbum={props.album.currentAlbum} />
      <TracksInAnAlbum tracklist={props.album.tracklist} />
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    album: state.album
  };
};

const connectedAlbumDetails = connect(
  mapStateToProps,
  { getOneAlbum }
)(AlbumDetails);
export default connectedAlbumDetails;

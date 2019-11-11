import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Container, Dimmer, Loader } from 'semantic-ui-react';
import { getOneArtist } from '../../actions/artistActions';
import AlbumsByArtist from './AlbumsByArtist';
import ArtistDetailsForm from './ArtistDetailsForm';

const ArtistDetails = props => {
  console.log('artist detail props', props);

  useEffect(() => {
    props.getOneArtist(props.id);
  }, [props.id]);

  if (props.artist.currentArtist === null) {
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
      <ArtistDetailsForm currentArtist={props.artist.currentArtist} />
      <AlbumsByArtist albumList={props.artist.albumList} />
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    artist: state.artist
  };
};

const connectedArtistDetails = connect(
  mapStateToProps,
  { getOneArtist }
)(ArtistDetails);
export default connectedArtistDetails;

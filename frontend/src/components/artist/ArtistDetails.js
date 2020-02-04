/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Dimmer, Loader } from 'semantic-ui-react';
import { getOneArtist } from '../../actions/artistActions';
import AlbumsByArtist from './AlbumsByArtist';
import ArtistDetailsForm from './ArtistDetailsForm';

const ArtistDetails = ({ id, getOneArtist, artist }) => {
  useEffect(() => {
    getOneArtist(id);
    // eslint-disable-next-line
  }, [id]);

  if (artist.currentArtist === null) {
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
      <ArtistDetailsForm currentArtist={artist.currentArtist} />
      <AlbumsByArtist albumList={artist.albumList} />
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    artist: state.artist
  };
};

ArtistDetails.propTypes = {
  id: PropTypes.number.isRequired,
  artist: PropTypes.arrayOf.isRequired,
  getOneArtist: PropTypes.func.isRequired
};

const connectedArtistDetails = connect(mapStateToProps, { getOneArtist })(
  ArtistDetails
);

export default connectedArtistDetails;

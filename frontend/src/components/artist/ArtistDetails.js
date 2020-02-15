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
    getOneArtist(parseInt(id));
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
  id: PropTypes.string.isRequired,
  artist: PropTypes.shape({
    albumList: PropTypes.arrayOf(
      PropTypes.shape({
        album_id: PropTypes.number,
        artist_id: PropTypes.number,
        artist_name: PropTypes.string,
        artist_spotify_id: PropTypes.string,
        identifier: PropTypes.string,
        name: PropTypes.string,
        report_occurrence: PropTypes.number,
        track_count: PropTypes.number
      })
    ),
    currentArtist: PropTypes.shape({
      created_at: PropTypes.string,
      id: PropTypes.number,
      name: PropTypes.string,
      old_id: PropTypes.number,
      spotify_id: PropTypes.string,
      updated_at: PropTypes.string,
      user_id: PropTypes.number
    }),
    loading: PropTypes.bool
  }),
  getOneArtist: PropTypes.func.isRequired
};

const connectedArtistDetails = connect(mapStateToProps, { getOneArtist })(
  ArtistDetails
);

export default connectedArtistDetails;

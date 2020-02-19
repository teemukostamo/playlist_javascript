import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Dimmer, Loader } from 'semantic-ui-react';
import AlbumDetailsForm from './AlbumDetailsForm';
import { getOneAlbum } from '../../actions/albumActions';
import TracksInAnAlbum from './TracksInAnAlbum';

const AlbumDetails = ({ id, album, getOneAlbumConnect }) => {
  useEffect(() => {
    getOneAlbumConnect(id);
    // eslint-disable-next-line
  }, [id]);

  if (album.currentAlbum === null) {
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
      <AlbumDetailsForm album_id={id} currentAlbum={album.currentAlbum} />
      <TracksInAnAlbum tracklist={album.tracklist} />
    </Container>
  );
};

const mapStateToProps = state => ({
  album: state.album
});

AlbumDetails.propTypes = {
  id: PropTypes.string.isRequired,
  album: PropTypes.shape({
    currentAlbum: PropTypes.arrayOf(
      PropTypes.shape({
        album_name: PropTypes.string,
        album_id: PropTypes.number,
        label: PropTypes.string,
        cat_id: PropTypes.string,
        spotify_id: PropTypes.string,
        year: PropTypes.string,
        artist_name: PropTypes.string,
        artist_id: PropTypes.number
      })
    ),
    tracklist: PropTypes.arrayOf(
      PropTypes.shape({
        track_id: PropTypes.number,
        isrc: PropTypes.string,
        disc_no: PropTypes.number,
        track_no: PropTypes.number,
        track_title: PropTypes.string,
        artist_name: PropTypes.string,
        report_occurrence: PropTypes.number
      })
    ),
    loading: PropTypes.bool
  }),
  getOneAlbumConnect: PropTypes.func
};

const connectedAlbumDetails = connect(mapStateToProps, {
  getOneAlbumConnect: getOneAlbum
})(AlbumDetails);
export default connectedAlbumDetails;

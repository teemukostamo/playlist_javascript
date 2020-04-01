import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Dimmer, Loader } from 'semantic-ui-react';
import AlbumDetailsForm from './AlbumDetailsForm';
import { getOneAlbum } from '../../actions/albumActions';
import TracksInAnAlbum from './TracksInAnAlbum';
import AddTrackToAlbum from './AddTrackToAlbum';

const AlbumDetails = ({ id, album, report, getOneAlbumConnect }) => {
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
      <AddTrackToAlbum album={album.currentAlbum} report={report} />
      <AlbumDetailsForm album_id={id} currentAlbum={album.currentAlbum} />
      <TracksInAnAlbum tracklist={album.tracklist} />
    </Container>
  );
};

const mapStateToProps = state => ({
  album: state.album,
  report: state.report
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
  report: PropTypes.shape({
    reportDetails: PropTypes.shape({
      program_name: PropTypes.string,
      program_no: PropTypes.number,
      program_dj: PropTypes.string,
      program_date: PropTypes.string,
      program_start_time: PropTypes.string,
      program_end_time: PropTypes.string,
      id: PropTypes.number,
      program_id: PropTypes.number,
      rerun: PropTypes.number,
      status: PropTypes.number,
      user_id: PropTypes.number,
      username: PropTypes.string,
      first_name: PropTypes.string,
      last_name: PropTypes.string
    }),
    report: PropTypes.arrayOf(
      PropTypes.shape({
        sortable_rank: PropTypes.number,
        artist_name: PropTypes.string,
        track_title: PropTypes.string,
        length: PropTypes.number,
        track_id: PropTypes.number,
        artist_id: PropTypes.number,
        album_id: PropTypes.number,
        album_name: PropTypes.string,
        disc_no: PropTypes.number,
        track_no: PropTypes.number,
        cat_id: PropTypes.string,
        country: PropTypes.number,
        isrc: PropTypes.string,
        label: PropTypes.string,
        people: PropTypes.string,
        record_country: PropTypes.string,
        year: PropTypes.string,
        report_track_id: PropTypes.number
      })
    )
  }),
  getOneAlbumConnect: PropTypes.func
};

const connectedAlbumDetails = connect(mapStateToProps, {
  getOneAlbumConnect: getOneAlbum
})(AlbumDetails);
export default connectedAlbumDetails;

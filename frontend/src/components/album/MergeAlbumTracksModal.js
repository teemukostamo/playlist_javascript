import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, Header, Form, Button, Dropdown } from 'semantic-ui-react';
import { mergeTrackFunction } from '../../actions/trackActions';

const MergeAlbumTracksModal = ({ track_id, track_title, album }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [trackToMerge, setTrackToMerge] = useState(null);
  const handleOpen = () => {
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
  };

  if (!modalOpen) {
    return (
      <button type='button' className='link-btn' onClick={handleOpen}>
        {track_id}
      </button>
    );
  }
  const onSubmit = () => {
    const mergeParams = {
      type: 'track',
      merge: trackToMerge,
      mergeTo: track_id
    };
    mergeTrackFunction(mergeParams);
  };

  const mergeOptions = album.tracklist.map(track => ({
    key: track.track_id,
    text: `${track.track_id} - ${track.track_title}`,
    value: track.track_id
  }));
  const getTrackToMerge = (e, { value }) => {
    e.preventDefault();
    setTrackToMerge(value);
  };
  return (
    <Modal
      open={modalOpen}
      closeIcon
      onClose={handleClose}
      trigger={
        <button type='button' className='link-btn' onClick={handleOpen}>
          {track_id}
        </button>
      }
    >
      <Header>
        Yhdistä biisiin {track_id} - {track_title} tiedot
      </Header>
      <Modal.Content>
        <Form onSubmit={onSubmit}>
          <Form.Field>
            <Dropdown
              onChange={getTrackToMerge}
              selection
              search
              options={mergeOptions}
            />
          </Form.Field>
          <Form.Field>
            <Button type='submit'>Yhdistä</Button>
          </Form.Field>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

MergeAlbumTracksModal.propTypes = {
  track_id: PropTypes.number.isRequired,
  track_title: PropTypes.string.isRequired,
  album: PropTypes.shape({
    currentAlbum: PropTypes.arrayOf(
      PropTypes.shape({
        album_name: PropTypes.string,
        album_id: PropTypes.number.isRequired,
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
    )
  })
};

const mapStateToProps = state => {
  return {
    album: state.album
  };
};

const connectedMergeAlbumTracksModal = connect(mapStateToProps, {
  mergeTrackFunction
})(MergeAlbumTracksModal);

export default connectedMergeAlbumTracksModal;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, Header, Form, Button, Dropdown } from 'semantic-ui-react';
import { mergeAlbumFunction } from '../../actions/albumActions';

const MergeAlbumsModal = ({
  album_id,
  album_name,
  artist,
  mergeAlbumsFunctionConnect
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [albumToMerge, setAlbumToMerge] = useState(null);
  const handleOpen = () => {
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
  };
  if (!modalOpen) {
    return (
      <button type='button' className='link-btn' onClick={handleOpen}>
        {album_id}
      </button>
    );
  }
  const onSubmit = () => {
    const mergeParams = {
      type: 'album',
      merge: albumToMerge,
      mergeTo: album_id
    };
    mergeAlbumsFunctionConnect(mergeParams);
    handleClose();
  };

  const mergeOptions = artist.albumList.map(album => ({
    key: album.album_id,
    text: `${album.album_id} - ${album.name}`,
    value: album.album_id
  }));
  const getAlbumToMerge = (e, { value }) => {
    e.preventDefault();
    setAlbumToMerge(value);
  };
  return (
    <Modal
      open={modalOpen}
      closeIcon
      onClose={handleClose}
      trigger={
        <button type='button' className='link-btn' onClick={handleOpen}>
          {album_id}
        </button>
      }
    >
      <Header>
        Yhdistä albumiin {album_id} - {album_name} tiedot
      </Header>
      <Modal.Content>
        <Form onSubmit={onSubmit}>
          <Form.Field>
            <Dropdown
              onChange={getAlbumToMerge}
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

MergeAlbumsModal.propTypes = {
  album_id: PropTypes.number.isRequired,
  album_name: PropTypes.string.isRequired,
  artist: PropTypes.shape({
    albumList: PropTypes.arrayOf(
      PropTypes.shape({
        album_id: PropTypes.number,
        artist_id: PropTypes.number,
        name: PropTypes.string,
        identifier: PropTypes.string,
        artist_name: PropTypes.string,
        artist_spotify_id: PropTypes.string,
        track_count: PropTypes.number,
        report_occurrence: PropTypes.number
      })
    ),
    currentArtist: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      spotify_id: PropTypes.string,
      user_id: PropTypes.number,
      created_at: PropTypes.string,
      updated_at: PropTypes.string
    }),
    loading: PropTypes.bool
  }),
  mergeAlbumsFunctionConnect: PropTypes.func
};

const mapStateToProps = state => {
  return {
    artist: state.artist
  };
};

const connectedMergeAlbumsModal = connect(mapStateToProps, {
  mergeAlbumsFunctionConnect: mergeAlbumFunction
})(MergeAlbumsModal);

export default connectedMergeAlbumsModal;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, Header, Form, Button, Dropdown } from 'semantic-ui-react';
import {
  mergeAlbumFunction,
  updateAlbumState
} from '../../actions/albumActions';
import ModalNotification from '../layout/ModalNotification';
import { setNotification } from '../../reducers/notificationReducer';

const MergeAlbums = ({
  search,
  album_id,
  album_name,
  mergeAlbumFunction,
  updateAlbumState,
  setNotification
}) => {
  // console.log('merge album tracks modal props', props);
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
      mergeTo: album_id,
      newName: album_name
    };
    if (mergeParams.merge === mergeParams.mergeTo) {
      setNotification('Tarkista albumi', 'fail');
    } else {
      updateAlbumState(mergeParams);
      mergeAlbumFunction(mergeParams);
      setNotification('Tiedot päivitetty!', 'success');
      handleClose();
    }
  };

  const mergeOptions = Array.from(
    new Set(search.advancedResults.map(r => r.album_id))
  ).map(album_id => {
    return {
      key: album_id,
      text: `${album_id}: ${
        search.advancedResults.find(r => r.album_id === album_id).album_name
      }`,
      value: album_id
    };
  });

  const getalbumToMerge = (e, { value }) => {
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
        <ModalNotification />

        <Form onSubmit={onSubmit}>
          <Form.Field>
            <Dropdown
              onChange={getalbumToMerge}
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

MergeAlbums.propTypes = {
  search: PropTypes.shape({
    advancedResults: PropTypes.arrayOf(
      PropTypes.shape({
        album_id: PropTypes.number,
        album_name: PropTypes.string,
        artist_id: PropTypes.number,
        artist_name: PropTypes.string,
        length: PropTypes.number,
        program_date: PropTypes.string,
        report_id: PropTypes.number,
        track_id: PropTypes.number,
        track_title: PropTypes.string
      })
    )
  }),
  album_id: PropTypes.number.isRequired,
  album_name: PropTypes.string.isRequired,
  mergeAlbumFunction: PropTypes.func,
  updateAlbumState: PropTypes.func,
  setNotification: PropTypes.func
};

const mapStateToProps = state => {
  // console.log('MergeAlbums state', state);
  return {
    search: state.search
  };
};

const connectedMergeAlbums = connect(mapStateToProps, {
  mergeAlbumFunction,
  updateAlbumState,
  setNotification
})(MergeAlbums);

export default connectedMergeAlbums;

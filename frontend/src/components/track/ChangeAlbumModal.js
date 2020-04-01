import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, Header, Form, Button, Search } from 'semantic-ui-react';
import { changeAlbumId } from '../../actions/trackActions';
import { setNotification } from '../../reducers/notificationReducer';
import { useChangeAlbumOptionsHook } from '../../hooks/changeAlbumOptionsHook';

const ChangeAlbumModal = ({
  currentTrack,
  changeAlbumIdConnect,
  setNotificationConnect
}) => {
  const { setInputText, search } = useChangeAlbumOptionsHook();
  const [modalOpen, setModalOpen] = useState(false);
  const [albumToChange, setAlbumToChange] = useState(null);
  const handleOpen = () => {
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
  };
  if (!modalOpen) {
    return (
      <button type='button' className='link-btn' onClick={handleOpen}>
        Vaihda albumi
      </button>
    );
  }
  let results = [];
  if (search.result === undefined) {
    results = [];
  } else {
    results = search.result.map(result => ({
      key: result.album_id,
      title: `#${result.album_id}: ${result.album_name}`,
      description: result.artist_name,
      length: result.length,
      value: result.album_id,
      album_name: result.album_name
    }));
  }
  const onSubmit = () => {
    const changedAlbum = {
      track_id: currentTrack.track_id,
      album_id: albumToChange.value,
      album_name: albumToChange.album_name
    };
    changeAlbumIdConnect(changedAlbum);
    setNotificationConnect(
      `${currentTrack.track_title} -biisin albumi vaihdettu!`,
      'success'
    );
    handleClose();
  };

  const handleResultSelect = (e, { result }) => {
    e.preventDefault();
    setAlbumToChange(result);
  };

  return (
    <Modal
      open={modalOpen}
      closeIcon
      onClose={handleClose}
      trigger={
        <button type='button' className='link-btn' onClick={handleOpen}>
          Vaihda albumi
        </button>
      }
    >
      <Header>Vaihda biisin {currentTrack.track_title} albumiksi:</Header>
      <Modal.Content>
        <Form.Field>
          <div className='searchResults'>
            <Search
              loading={search.loading}
              onResultSelect={handleResultSelect}
              onSearchChange={e => setInputText(e.target.value)}
              onSelectionChange={handleResultSelect}
              results={results}

              // value={value}
            />
          </div>
        </Form.Field>
        <Form.Field>
          <Button onClick={onSubmit}>Vaihda</Button>
        </Form.Field>
      </Modal.Content>
    </Modal>
  );
};

ChangeAlbumModal.propTypes = {
  currentTrack: PropTypes.shape({
    album: PropTypes.string,
    album_id: PropTypes.number,
    artist: PropTypes.string,
    artist_id: PropTypes.number,
    cat_id: PropTypes.string,
    comment: PropTypes.string,
    country: PropTypes.number,
    disc_no: PropTypes.number,
    isrc: PropTypes.string,
    label: PropTypes.string,
    length: PropTypes.number,
    people: PropTypes.string,
    record_country: PropTypes.string,
    track_id: PropTypes.number,
    track_no: PropTypes.number,
    track_title: PropTypes.string,
    year: PropTypes.string
  }),
  changeAlbumIdConnect: PropTypes.func,
  setNotificationConnect: PropTypes.func
};

const mapStateToProps = state => {
  return {
    search: state.search
  };
};

const connectedChangeAlbumModal = connect(mapStateToProps, {
  changeAlbumIdConnect: changeAlbumId,
  setNotificationConnect: setNotification
})(ChangeAlbumModal);

export default connectedChangeAlbumModal;

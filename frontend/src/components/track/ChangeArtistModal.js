import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, Header, Form, Button, Search } from 'semantic-ui-react';
import { changeArtistId } from '../../actions/trackActions';
import { setNotification } from '../../reducers/notificationReducer';
import { useChangeArtistOptionsHook } from '../../hooks/changeArtistOptionsHook';

const ChangeArtistModal = ({
  currentTrack,
  changeArtistId,
  setNotification
}) => {
  const { setInputText, search } = useChangeArtistOptionsHook();
  const [modalOpen, setModalOpen] = useState(false);
  const [artistToChange, setArtistToChange] = useState(null);
  const handleOpen = () => {
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
  };
  if (!modalOpen) {
    return (
      <button type='button' className='link-btn' onClick={handleOpen}>
        Vaihda artisti
      </button>
    );
  }
  let results = [];
  if (search.result === undefined) {
    results = [];
  } else {
    results = search.result.map(result => ({
      key: result.artist_id,
      title: `#${result.artist_id}: ${result.artist_name}`,
      description: result.artist_name,
      value: result.artist_id,
      artist_name: result.artist_name
    }));
  }

  const onSubmit = () => {
    const changedArtist = {
      track_id: currentTrack.track_id,
      artist_id: artistToChange.value,
      artist_name: artistToChange.artist_name
    };
    changeArtistId(changedArtist);
    setNotification(
      `${currentTrack.track_title} -biisin artisti vaihdettu!`,
      'success'
    );
    handleClose();
  };

  const handleResultSelect = (e, { result }) => {
    e.preventDefault();
    setArtistToChange(result);
  };

  return (
    <Modal
      open={modalOpen}
      closeIcon
      onClose={handleClose}
      trigger={
        <button type='button' className='link-btn' onClick={handleOpen}>
          Vaihda artisti
        </button>
      }
    >
      <Header>Vaihda biisin {currentTrack.track_title} artistiksi:</Header>
      <Modal.Content>
        <Form.Field>
          <div className='searchResults'>
            <Search
              loading={search.loading}
              onResultSelect={handleResultSelect}
              onSearchChange={e => setInputText(e.target.value)}
              onSelectionChange={handleResultSelect}
              results={results}
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

ChangeArtistModal.propTypes = {
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
  changeArtistId: PropTypes.func,
  setNotification: PropTypes.func
};

const mapStateToProps = state => {
  return {
    search: state.search
  };
};

const connectedChangeArtistModal = connect(mapStateToProps, {
  changeArtistId,
  setNotification
})(ChangeArtistModal);

export default connectedChangeArtistModal;

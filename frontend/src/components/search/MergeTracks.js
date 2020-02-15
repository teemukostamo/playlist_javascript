import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, Header, Form, Button, Dropdown } from 'semantic-ui-react';
import {
  mergeTrackFunction,
  updateTrackState
} from '../../actions/trackActions';
import ModalNotification from '../layout/ModalNotification';
import { setNotification } from '../../reducers/notificationReducer';

const MergeTracks = ({
  track_id,
  track_title,
  search,
  setNotification,
  mergeTrackFunction,
  updateTrackState
}) => {
  // console.log('merge track tracks modal props', props);
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
      mergeTo: track_id,
      newName: track_title
    };
    if (mergeParams.merge === mergeParams.mergeTo) {
      setNotification('Tarkista biisi', 'fail');
    } else {
      mergeTrackFunction(mergeParams);
      updateTrackState(mergeParams);
      setNotification('Tiedot päivitetty!', 'success');
      handleClose();
    }
  };

  const mergeOptions = search.advancedResults.map(track => ({
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
        Yhdistä biisiin {track_id} - {track_title} tiedot:
      </Header>
      <Modal.Content>
        <ModalNotification />

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

MergeTracks.propTypes = {
  mergeTrackFunction: PropTypes.func,
  updateTrackState: PropTypes.func,
  setNotification: PropTypes.func,
  track_id: PropTypes.number,
  track_title: PropTypes.string,
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
  })
};

const mapStateToProps = state => {
  return {
    search: state.search
  };
};

const connectedMergeTracks = connect(mapStateToProps, {
  mergeTrackFunction,
  updateTrackState,
  setNotification
})(MergeTracks);

export default connectedMergeTracks;

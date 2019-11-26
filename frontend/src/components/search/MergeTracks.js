import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Modal, Header, Form, Button, Dropdown } from 'semantic-ui-react';
import {
  mergeTrackFunction,
  updateTrackState
} from '../../actions/trackActions';
import ModalNotification from '../layout/ModalNotification';
import { setNotification } from '../../reducers/notificationReducer';

const MergeTracks = props => {
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
      <button className="link-btn" onClick={handleOpen}>
        {props.track_id}
      </button>
    );
  } else {
    const onSubmit = () => {
      const mergeParams = {
        type: 'track',
        merge: trackToMerge,
        mergeTo: props.track_id,
        newName: props.track_title
      };
      console.log(mergeParams);
      if (mergeParams.merge === mergeParams.mergeTo) {
        props.setNotification('Tarkista biisi', 'fail');
      } else {
        props.mergeTrackFunction(mergeParams);
        props.updateTrackState(mergeParams);
        props.setNotification('Tiedot päivitetty!', 'success');
        handleClose();
      }
    };

    const mergeOptions = props.search.advancedResults.map(track => ({
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
          <button className="link-btn" onClick={handleOpen}>
            {props.track_id}
          </button>
        }
      >
        <Header>
          Yhdistä biisiin {props.track_id} - {props.track_title} tiedot:
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
              <Button type="submit">Yhdistä</Button>
            </Form.Field>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
};

const mapStateToProps = state => {
  // console.log('MergeTracks state', state);
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

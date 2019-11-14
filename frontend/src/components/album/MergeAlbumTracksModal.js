import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Modal, Header, Form, Button, Dropdown, Icon } from 'semantic-ui-react';
import { mergeTrackFunction } from '../../actions/trackActions';

const MergeAlbumTracksModal = props => {
  console.log('merge album tracks modal props', props);
  const [modalOpen, setModalOpen] = useState(false);
  const [trackToMerge, setTrackToMerge] = useState(null);
  const handleOpen = () => {
    setModalOpen(true);
    console.log(modalOpen);
  };
  const handleClose = () => {
    setModalOpen(false);
  };

  const onSubmit = () => {
    const mergeParams = {
      type: 'track',
      merge: trackToMerge,
      mergeTo: props.track_id
    };
    mergeTrackFunction(mergeParams);
  };

  const mergeOptions = props.album.tracklist.map(track => ({
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
        <a style={{ cursor: 'pointer' }} onClick={handleOpen}>
          <Icon
            style={{ cursor: 'pointer' }}
            color="blue"
            onClick={handleOpen}
            name="sync"
          />
          {props.track_id}
        </a>
      }
    >
      <Header>
        Yhdistä biisiin {props.track_id} - {props.track_title} tiedot
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
            <Button type="submit">Yhdistä</Button>
          </Form.Field>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

const mapStateToProps = state => {
  console.log('MergeAlbumTracksModal state', state);
  return {
    album: state.album
  };
};

const connectedMergeAlbumTracksModal = connect(
  mapStateToProps,
  { mergeTrackFunction }
)(MergeAlbumTracksModal);

export default connectedMergeAlbumTracksModal;

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Modal, Header, Form, Button, Dropdown } from 'semantic-ui-react';
import { mergeTrackFunction } from '../../actions/trackActions';

const MergeTracks = props => {
  console.log('merge track tracks modal props', props);
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
        mergeTo: props.track_id
      };
      console.log(mergeParams);
      props.mergeTrackFunction(mergeParams);
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
  console.log('MergeTracks state', state);
  return {
    search: state.search
  };
};

const connectedMergeTracks = connect(
  mapStateToProps,
  { mergeTrackFunction }
)(MergeTracks);

export default connectedMergeTracks;

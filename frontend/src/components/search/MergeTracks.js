import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Modal, Header, Form, Button, Dropdown, Icon } from 'semantic-ui-react';

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

  const onSubmit = () => {
    const mergeInto = props.track_id;
    console.log('merging track', trackToMerge, 'into track', mergeInto);
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
        <a
          style={{
            fontSize: '0.8rem',
            cursor: 'pointer',
            float: 'right',
            color: 'teal'
          }}
          onClick={handleOpen}
        >
          {props.track_id}
        </a>
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
};

const mapStateToProps = state => {
  console.log('MergeTracks state', state);
  return {
    search: state.search
  };
};

const connectedMergeTracks = connect(
  mapStateToProps,
  null
)(MergeTracks);

export default connectedMergeTracks;

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Modal, Header, Form, Button } from 'semantic-ui-react';

const ChangeArtistModal = props => {
  console.log('change album modal props', props);
  const [modalOpen, setModalOpen] = useState(false);
  const [artistToChange, setArtistToChange] = useState(null);
  const handleOpen = () => {
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
  };
  const onSubmit = () => {
    console.log('klikd submit change album');
  };
  const getArtistToChange = (e, { value }) => {
    e.preventDefault();
    setArtistToChange(value);
  };
  return (
    <Modal
      open={modalOpen}
      closeIcon
      onClose={handleClose}
      trigger={
        <a
          style={{
            cursor: 'pointer',
            fontSize: '0.8rem',
            color: 'teal'
          }}
          onClick={handleOpen}
        >
          Vaihda artisti
        </a>
      }
    >
      <Header>
        Vaihda biisin {props.currentTrack.track_title} artistiksi:
      </Header>
      <Modal.Content>
        <Form onSubmit={onSubmit}>
          <Form.Field></Form.Field>
          <Form.Field>
            <Button type="submit">Yhdistä</Button>
          </Form.Field>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

const connectedChangeArtistModal = connect(
  null,
  null
)(ChangeArtistModal);

export default connectedChangeArtistModal;

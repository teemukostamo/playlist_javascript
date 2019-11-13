import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Modal, Header, Form, Button, Dropdown, Icon } from 'semantic-ui-react';

const MergeAlbums = props => {
  console.log('merge album tracks modal props', props);
  const [modalOpen, setModalOpen] = useState(false);
  const [albumToMerge, setAlbumToMerge] = useState(null);
  const handleOpen = () => {
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
  };

  const onSubmit = () => {
    const mergeInto = props.album_id;
    console.log('merging album', albumToMerge, 'into album', mergeInto);
  };

  const mergeOptions = props.search.advancedResults.map(album => ({
    key: album.album_id,
    text: `${album.album_id} - ${album.album_name}`,
    value: album.album_id
  }));
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
        <a
          style={{
            cursor: 'pointer',
            fontSize: '0.8rem',
            float: 'right',
            color: 'teal'
          }}
          onClick={handleOpen}
        >
          {props.album_id}
        </a>
      }
    >
      <Header>
        Yhdistä albumiin {props.album_id} - {props.album_name} tiedot
      </Header>
      <Modal.Content>
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
            <Button type="submit">Yhdistä</Button>
          </Form.Field>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

const mapStateToProps = state => {
  console.log('MergeAlbums state', state);
  return {
    search: state.search
  };
};

const connectedMergeAlbums = connect(
  mapStateToProps,
  null
)(MergeAlbums);

export default connectedMergeAlbums;

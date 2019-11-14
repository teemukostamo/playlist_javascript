import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Modal, Header, Form, Button, Dropdown } from 'semantic-ui-react';
import { mergeAlbumFunction } from '../../actions/albumActions';
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
    const mergeParams = {
      type: 'album',
      merge: albumToMerge,
      mergeTo: props.album_id
    };
    console.log(mergeParams);
    props.mergeAlbumFunction(mergeParams);
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
  { mergeAlbumFunction }
)(MergeAlbums);

export default connectedMergeAlbums;

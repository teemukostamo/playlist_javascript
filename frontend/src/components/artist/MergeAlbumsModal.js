import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Modal, Header, Form, Button, Dropdown } from 'semantic-ui-react';
import { mergeAlbumFunction } from '../../actions/albumActions';

const MergeAlbumsModal = props => {
  const [modalOpen, setModalOpen] = useState(false);
  const [albumToMerge, setAlbumToMerge] = useState(null);
  const handleOpen = () => {
    setModalOpen(true);
    console.log(modalOpen);
  };
  const handleClose = () => {
    setModalOpen(false);
  };
  if (!modalOpen) {
    return (
      <button className="link-btn" onClick={handleOpen}>
        {props.album_id}
      </button>
    );
  } else {
    const onSubmit = () => {
      const mergeParams = {
        type: 'album',
        merge: albumToMerge,
        mergeTo: props.album_id
      };
      console.log(mergeParams);
      props.mergeAlbumFunction(mergeParams);
    };

    const mergeOptions = props.artist.albumList.map(album => ({
      key: album.album_id,
      text: `${album.album_id} - ${album.name}`,
      value: album.album_id
    }));
    const getAlbumToMerge = (e, { value }) => {
      e.preventDefault();
      setAlbumToMerge(value);
    };
    return (
      <Modal
        open={modalOpen}
        closeIcon
        onClose={handleClose}
        trigger={
          <button className="link-btn" onClick={handleOpen}>
            {props.album_id}
          </button>
        }
      >
        <Header>
          Yhdistä albumiin {props.album_id} - {props.album_name} tiedot
        </Header>
        <Modal.Content>
          <Form onSubmit={onSubmit}>
            <Form.Field>
              <Dropdown
                onChange={getAlbumToMerge}
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
  console.log('MergeAlbumsModal state', state);
  return {
    artist: state.artist
  };
};

const connectedMergeAlbumsModal = connect(
  mapStateToProps,
  { mergeAlbumFunction }
)(MergeAlbumsModal);

export default connectedMergeAlbumsModal;

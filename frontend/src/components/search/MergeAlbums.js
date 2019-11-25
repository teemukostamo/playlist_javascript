import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Modal, Header, Form, Button, Dropdown } from 'semantic-ui-react';
import { mergeAlbumFunction } from '../../actions/albumActions';
import { setNotification } from '../../reducers/notificationReducer';

const MergeAlbums = props => {
  // console.log('merge album tracks modal props', props);
  const [modalOpen, setModalOpen] = useState(false);
  const [albumToMerge, setAlbumToMerge] = useState(null);
  const handleOpen = () => {
    setModalOpen(true);
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
      props.setNotification('Tiedot päivitetty!', 'success');
      handleClose();
    };

    const mergeOptions = Array.from(
      new Set(props.search.advancedResults.map(r => r.album_id))
    ).map(album_id => {
      return {
        key: album_id,
        text: `${album_id}: ${
          props.search.advancedResults.find(r => r.album_id === album_id)
            .album_name
        }`,
        value: album_id
      };
    });

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
  }
};

const mapStateToProps = state => {
  // console.log('MergeAlbums state', state);
  return {
    search: state.search
  };
};

const connectedMergeAlbums = connect(mapStateToProps, {
  mergeAlbumFunction,
  setNotification
})(MergeAlbums);

export default connectedMergeAlbums;

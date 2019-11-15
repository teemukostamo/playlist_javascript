import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Modal, Header, Form, Button, Search } from 'semantic-ui-react';
import { changeAlbumId } from '../../actions/trackActions';
import { setNotification } from '../../reducers/notificationReducer';
import { useChangeAlbumOptionsHook } from '../../hooks/changeAlbumOptionsHook';

const ChangeAlbumModal = props => {
  console.log('change album modal props', props);
  const { setInputText, search } = useChangeAlbumOptionsHook();
  console.log(search);
  const [modalOpen, setModalOpen] = useState(false);
  const [albumToChange, setAlbumToChange] = useState(null);
  const handleOpen = () => {
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
  };
  if (!modalOpen) {
    return (
      <button className="link-btn" onClick={handleOpen}>
        Vaihda albumi
      </button>
    );
  } else {
    let results = [];
    if (search.result === undefined) {
      results = [];
    } else {
      results = search.result.map(result => ({
        key: result.album_id,
        title: `#${result.album_id}: ${result.album_name}`,
        description: result.artist_name,
        length: result.length,
        value: result.album_id,
        album_name: result.album_name
      }));
    }
    const onSubmit = () => {
      console.log('klikd submit change album');
      console.log(
        'inserting into track id ',
        props.currentTrack.track_id,
        'album id',
        albumToChange.value,
        albumToChange.album_name
      );
      const changedAlbum = {
        track_id: props.currentTrack.track_id,
        album_id: albumToChange.value,
        album_name: albumToChange.album_name
      };
      console.log(changedAlbum);
      props.changeAlbumId(changedAlbum);
      props.setNotification(
        `${props.currentTrack.track_title} -biisin albumi vaihdettu!`,
        'success'
      );
      handleClose();
    };

    const handleResultSelect = (e, { result }) => {
      e.preventDefault();
      setAlbumToChange(result);
    };

    return (
      <Modal
        open={modalOpen}
        closeIcon
        onClose={handleClose}
        trigger={
          <button className="link-btn" onClick={handleOpen}>
            Vaihda albumi
          </button>
        }
      >
        <Header>
          Vaihda biisin {props.currentTrack.track_title} albumiksi:
        </Header>
        <Modal.Content>
          <Form.Field>
            <div className="searchResults">
              <Search
                loading={search.loading}
                onResultSelect={handleResultSelect}
                onSearchChange={e => setInputText(e.target.value)}
                onSelectionChange={handleResultSelect}
                results={results}

                // value={value}
              />
            </div>
          </Form.Field>
          <Form.Field>
            <Button onClick={onSubmit}>Vaihda</Button>
          </Form.Field>
        </Modal.Content>
      </Modal>
    );
  }
};

const mapStateToProps = state => {
  console.log('change album modal state', state);
  return {
    search: state.search
  };
};

const connectedChangeAlbumModal = connect(
  mapStateToProps,
  { changeAlbumId, setNotification }
)(ChangeAlbumModal);

export default connectedChangeAlbumModal;

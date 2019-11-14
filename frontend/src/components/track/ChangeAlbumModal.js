import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Modal, Header, Form, Button, Search } from 'semantic-ui-react';
import { getChangeAlbumOptions } from '../../actions/searchActions';
import { changeAlbumId } from '../../actions/trackActions';

const ChangeAlbumModal = props => {
  console.log('change album modal props', props);
  const [modalOpen, setModalOpen] = useState(false);
  const [albumToChange, setAlbumToChange] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    if (searchQuery.length >= 3) {
      let timeout = null;
      console.log('fire when typed to search', searchQuery);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        props.getChangeAlbumOptions(searchQuery);
      }, 1000);
    }
    // eslint-disable-next-line
  }, [searchQuery]);
  let results = [];
  if (props.search.changeAlbumOptions) {
    results = props.search.changeAlbumOptions.map(result => ({
      key: result.album_id,
      title: `Albumi: ${result.album_name}, album_id: ${result.album_id}, ${result.artist_name}`,
      value: result.album_id
    }));
  }

  const handleOpen = () => {
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
  };
  const onSubmit = () => {
    console.log('klikd submit change album');
    console.log(
      'inserting into track id ',
      props.currentTrack.track_id,
      'album id',
      albumToChange.value
    );
    const changedAlbum = {
      track_id: props.currentTrack.track_id,
      album_id: albumToChange.value
    };
    props.changeAlbumId(changedAlbum);
    handleClose();
  };

  const handleResultSelect = (e, { result }) => {
    e.preventDefault();
    setAlbumToChange(result);
  };
  const onSearchChange = (e, { value }) => {
    setSearchQuery(value);
    // if (searchQuery.length >= 3) {
    //   setTimeout(() => {
    //     getAutocompleteResults(searchQuery);
    //   }, 300);
    // }
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
          Vaihda albumi
        </a>
      }
    >
      <Header>Vaihda biisin {props.currentTrack.track_title} albumiks:</Header>
      <Modal.Content>
        <Form.Field>
          <Search
            loading={props.search.loading}
            onResultSelect={handleResultSelect}
            onSearchChange={onSearchChange}
            onSelectionChange={handleResultSelect}
            results={results}

            // value={value}
          />
        </Form.Field>
        <Form.Field>
          <Button onClick={onSubmit}>Yhdistä</Button>
        </Form.Field>
      </Modal.Content>
    </Modal>
  );
};

const mapStateToProps = state => {
  console.log('change album modal state', state);
  return {
    search: state.search
  };
};

const connectedChangeAlbumModal = connect(
  mapStateToProps,
  { getChangeAlbumOptions, changeAlbumId }
)(ChangeAlbumModal);

export default connectedChangeAlbumModal;

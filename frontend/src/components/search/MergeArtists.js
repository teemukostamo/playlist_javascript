import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, Header, Form, Button, Dropdown } from 'semantic-ui-react';
import {
  mergeArtistFunction,
  updateArtistState
} from '../../actions/artistActions';
import { setNotification } from '../../reducers/notificationReducer';
import ModalNotification from '../layout/ModalNotification';

const MergeArtists = ({
  artist_id,
  artist_name,
  search,
  mergeArtistFunctionConnect,
  updateArtistStateConnect,
  setNotificationConnect
}) => {
  // console.log('merge album tracks modal props', props);
  const [modalOpen, setModalOpen] = useState(false);
  const [artistToMerge, setArtistToMerge] = useState(null);
  const handleOpen = () => {
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
  };
  if (!modalOpen) {
    return (
      <button type='button' className='link-btn' onClick={handleOpen}>
        {artist_id}
      </button>
    );
  }
  const onSubmit = () => {
    const mergeParams = {
      type: 'artist',
      mergeTo: artist_id,
      merge: artistToMerge,
      newName: artist_name
    };
    if (mergeParams.merge === mergeParams.mergeTo) {
      setNotificationConnect('Tarkista artisti', 'fail');
    } else {
      mergeArtistFunctionConnect(mergeParams);
      updateArtistStateConnect(mergeParams);
      setNotificationConnect('Tiedot päivitetty!', 'success');
      handleClose();
    }
  };

  const mergeOptions = Array.from(
    new Set(search.advancedResults.map(r => r.artist_id))
  ).map(artist_id => {
    return {
      key: artist_id,
      text: `${artist_id}: ${
        search.advancedResults.find(r => r.artist_id === artist_id).artist_name
      }`,
      value: artist_id
    };
  });
  const getArtistToMerge = (e, { value }) => {
    e.preventDefault();
    setArtistToMerge(value);
  };
  return (
    <Modal
      open={modalOpen}
      closeIcon
      onClose={handleClose}
      trigger={
        <button type='button' className='link-btn' onClick={handleOpen}>
          {artist_id}
        </button>
      }
    >
      <Header>
        Yhdistä artistiin {artist_id} - {artist_name} tiedot
      </Header>
      <Modal.Content>
        <ModalNotification />
        <Form onSubmit={onSubmit}>
          <Form.Field>
            <Dropdown
              onChange={getArtistToMerge}
              selection
              search
              options={mergeOptions}
            />
          </Form.Field>
          <Form.Field>
            <Button type='submit'>Yhdistä</Button>
          </Form.Field>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

MergeArtists.propTypes = {
  search: PropTypes.shape({
    advancedResults: PropTypes.arrayOf(
      PropTypes.shape({
        album_id: PropTypes.number,
        album_name: PropTypes.string,
        artist_id: PropTypes.number,
        artist_name: PropTypes.string,
        length: PropTypes.number,
        program_date: PropTypes.string,
        report_id: PropTypes.number,
        track_id: PropTypes.number,
        track_title: PropTypes.string
      })
    )
  }),
  artist_id: PropTypes.number,
  artist_name: PropTypes.string,
  setNotificationConnect: PropTypes.func,
  mergeArtistFunctionConnect: PropTypes.func,
  updateArtistStateConnect: PropTypes.func
};

const mapStateToProps = state => {
  // console.log('MergeArtists state', state);
  return {
    search: state.search
  };
};

const connectedMergeArtists = connect(mapStateToProps, {
  mergeArtistFunctionConnect: mergeArtistFunction,
  updateArtistStateConnect: updateArtistState,
  setNotificationConnect: setNotification
})(MergeArtists);

export default connectedMergeArtists;

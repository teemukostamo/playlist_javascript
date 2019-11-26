import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Modal, Header, Form, Button, Dropdown } from 'semantic-ui-react';
import {
  mergeArtistFunction,
  updateArtistState
} from '../../actions/artistActions';
import { setNotification } from '../../reducers/notificationReducer';
import ModalNotification from '../layout/ModalNotification';
const MergeArtists = props => {
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
      <button className="link-btn" onClick={handleOpen}>
        {props.artist_id}
      </button>
    );
  } else {
    const onSubmit = () => {
      const mergeInto = props.artist_id;
      console.log('merging', artistToMerge, 'into', mergeInto);
      const mergeParams = {
        type: 'artist',
        mergeTo: props.artist_id,
        merge: artistToMerge,
        newName: props.artist_name
      };
      if (mergeParams.merge === mergeParams.mergeTo) {
        props.setNotification('Tarkista artisti', 'fail');
      } else {
        props.mergeArtistFunction(mergeParams);
        props.updateArtistState(mergeParams);
        props.setNotification('Tiedot päivitetty!', 'success');
        handleClose();
        console.log(mergeParams);
      }
    };

    const mergeOptions = Array.from(
      new Set(props.search.advancedResults.map(r => r.artist_id))
    ).map(artist_id => {
      return {
        key: artist_id,
        text: `${artist_id}: ${
          props.search.advancedResults.find(r => r.artist_id === artist_id)
            .artist_name
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
          <button className="link-btn" onClick={handleOpen}>
            {props.artist_id}
          </button>
        }
      >
        <Header>
          Yhdistä artistiin {props.artist_id} - {props.artist_name} tiedot
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
              <Button type="submit">Yhdistä</Button>
            </Form.Field>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
};

const mapStateToProps = state => {
  // console.log('MergeArtists state', state);
  return {
    search: state.search
  };
};

const connectedMergeArtists = connect(mapStateToProps, {
  mergeArtistFunction,
  updateArtistState,
  setNotification
})(MergeArtists);

export default connectedMergeArtists;

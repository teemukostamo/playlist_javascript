import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Modal, Header, Form, Button, Search } from 'semantic-ui-react';
import { changeArtistId } from '../../actions/trackActions';
import { setNotification } from '../../reducers/notificationReducer';
import { useChangeArtistOptionsHook } from '../../hooks/changeArtistOptionsHook';

const ChangeArtistModal = props => {
  console.log('change artist modal props', props);
  const { setInputText, search } = useChangeArtistOptionsHook();
  const [modalOpen, setModalOpen] = useState(false);
  const [artistToChange, setArtistToChange] = useState(null);
  const handleOpen = () => {
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
  };
  if (!modalOpen) {
    return (
      <button className="link-btn" onClick={handleOpen}>
        Vaihda artisti
      </button>
    );
  } else {
    let results = [];
    if (search.result === undefined) {
      results = [];
    } else {
      results = search.result.map(result => ({
        key: result.artist_id,
        title: `#${result.artist_id}: ${result.artist_name}`,
        description: result.artist_name,
        value: result.artist_id,
        artist_name: result.artist_name
      }));
    }

    const onSubmit = () => {
      console.log('klikd submit change artist');
      console.log(
        'inserting into track id ',
        props.currentTrack.track_id,
        'artist id',
        artistToChange.value,
        artistToChange.artist_name
      );
      const changedArtist = {
        track_id: props.currentTrack.track_id,
        artist_id: artistToChange.value,
        artist_name: artistToChange.artist_name
      };
      console.log(changedArtist);
      props.changeArtistId(changedArtist);
      props.setNotification(
        `${props.currentTrack.track_title} -biisin artisti vaihdettu!`,
        'success'
      );
      handleClose();
    };

    const handleResultSelect = (e, { result }) => {
      e.preventDefault();
      setArtistToChange(result);
    };

    return (
      <Modal
        open={modalOpen}
        closeIcon
        onClose={handleClose}
        trigger={
          <button className="link-btn" onClick={handleOpen}>
            Vaihda artisti
          </button>
        }
      >
        <Header>
          Vaihda biisin {props.currentTrack.track_title} artistiksi:
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

const connectedChangeArtistModal = connect(
  mapStateToProps,
  { changeArtistId, setNotification }
)(ChangeArtistModal);

export default connectedChangeArtistModal;

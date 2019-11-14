import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Modal, Header, Form, Button, Dropdown } from 'semantic-ui-react';
import { mergeArtistFunction } from '../../actions/artistActions';
const MergeArtists = props => {
  console.log('merge album tracks modal props', props);
  const [modalOpen, setModalOpen] = useState(false);
  const [artistToMerge, setArtistToMerge] = useState(null);
  const handleOpen = () => {
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
  };

  const onSubmit = () => {
    const mergeInto = props.artist_id;
    console.log('merging', artistToMerge, 'into', mergeInto);
    const mergeParams = {
      type: 'artist',
      mergeTo: props.artist_id,
      merge: artistToMerge
    };
    props.mergeArtistFunction(mergeParams);
    console.log(mergeParams);
  };

  const mergeOptions = props.search.advancedResults.map(artist => ({
    key: artist.artist_id,
    text: `${artist.artist_id} - ${artist.artist_name}`,
    value: artist.artist_id
  }));
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
        <a
          style={{
            cursor: 'pointer',
            fontSize: '0.8rem',
            float: 'right',
            color: 'teal'
          }}
          onClick={handleOpen}
        >
          {props.artist_id}
        </a>
      }
    >
      <Header>
        Yhdistä artistiin {props.artist_id} - {props.artist_name} tiedot
      </Header>
      <Modal.Content>
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
};

const mapStateToProps = state => {
  console.log('MergeArtists state', state);
  return {
    search: state.search
  };
};

const connectedMergeArtists = connect(
  mapStateToProps,
  { mergeArtistFunction }
)(MergeArtists);

export default connectedMergeArtists;

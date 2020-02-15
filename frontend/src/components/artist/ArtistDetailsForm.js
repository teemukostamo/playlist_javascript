import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Input, Button, Grid, Dimmer, Loader } from 'semantic-ui-react';
import Notification from '../layout/Notification';
import { updateArtist } from '../../actions/artistActions';
import { setNotification } from '../../reducers/notificationReducer';

const ArtistDetailsForm = ({
  currentArtist,
  setNotification,
  updateArtist
}) => {
  const [artist, setArtist] = useState(currentArtist.name);
  const [spotifyId, setSpotifyId] = useState(currentArtist.spotify_id);
  if (currentArtist === null) {
    return (
      <Dimmer>
        <Loader>Ladataan...</Loader>
      </Dimmer>
    );
  }

  const saveChanges = () => {
    const artistToUpdate = {
      id: currentArtist.id,
      name: artist,
      spotify_id: spotifyId
    };
    updateArtist(artistToUpdate);
    setNotification(
      `Artistin ${artistToUpdate.name} tiedot päivitetty!`,
      'success'
    );
  };
  return (
    <Grid columns={2}>
      <Grid.Column>
        <h2>Artistin tiedot</h2>
        <Notification />
        <Form>
          <Form.Field
            label='Artistin nimi'
            control={Input}
            type='text'
            defaultValue={artist}
            onChange={e => setArtist(e.target.value)}
          />
          <Form.Field
            label='Spotify ID'
            control={Input}
            type='text'
            defaultValue={spotifyId}
            onChange={e => setSpotifyId(e.target.value)}
          />
          <Form.Field>
            <Button onClick={saveChanges} color='green'>
              Tallenna muutokset
            </Button>
          </Form.Field>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

ArtistDetailsForm.propTypes = {
  currentArtist: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    spotify_id: PropTypes.string,
    user_id: PropTypes.number,
    created_at: PropTypes.string,
    updated_at: PropTypes.string
  }),
  updateArtist: PropTypes.func,
  setNotification: PropTypes.func
};

const connectedArtistDetailsForm = connect(null, {
  updateArtist,
  setNotification
})(ArtistDetailsForm);

export default connectedArtistDetailsForm;

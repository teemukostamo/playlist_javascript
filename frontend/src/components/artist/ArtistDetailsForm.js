import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Input, Button, Grid, Dimmer, Loader } from 'semantic-ui-react';
import { updateArtist } from '../../actions/artistActions';
import { setNotification } from '../../reducers/notificationReducer';

const ArtistDetailsForm = ({
  currentArtist,
  setNotificationConnect,
  updateArtistConnect
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
    updateArtistConnect(artistToUpdate);
    setNotificationConnect(
      `Artistin ${artistToUpdate.name} tiedot päivitetty!`,
      'success'
    );
  };
  return (
    <Grid columns={2}>
      <Grid.Column>
        <h2>Artistin tiedot</h2>
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
  updateArtistConnect: PropTypes.func,
  setNotificationConnect: PropTypes.func
};

const connectedArtistDetailsForm = connect(null, {
  updateArtistConnect: updateArtist,
  setNotificationConnect: setNotification
})(ArtistDetailsForm);

export default connectedArtistDetailsForm;

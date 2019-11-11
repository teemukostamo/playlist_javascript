import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Grid, Dimmer, Loader } from 'semantic-ui-react';
import { updateArtist } from '../../actions/artistActions';

const ArtistDetailsForm = props => {
  console.log(props);
  const [artist, setArtist] = useState(props.currentArtist.name);
  const [spotifyId, setSpotifyId] = useState(props.currentArtist.spotify_id);
  if (props.currentArtist === null) {
    return (
      <Dimmer>
        <Loader>Ladataan...</Loader>
      </Dimmer>
    );
  }

  const saveChanges = () => {
    console.log('klikd save artist');
    const artistToUpdate = {
      id: props.currentArtist.id,
      name: artist,
      spotify_id: spotifyId
    };
    console.log(artistToUpdate);
  };
  return (
    <Grid columns={2}>
      <Grid.Column>
        <h2>Artistin tiedot</h2>
        <Form>
          <Form.Field>
            <label>Artistin nimi</label>
            <Input
              type="text"
              defaultValue={artist}
              onChange={e => setArtist(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Spotify id</label>
            <Input
              type="text"
              defaultValue={spotifyId}
              onChange={e => setSpotifyId(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <Button onClick={saveChanges} color="green">
              Tallenna muutokset
            </Button>
          </Form.Field>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

const connectedArtistDetailsForm = connect(
  null,
  null
)(ArtistDetailsForm);

export default connectedArtistDetailsForm;

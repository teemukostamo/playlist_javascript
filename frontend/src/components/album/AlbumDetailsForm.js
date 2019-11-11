import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Grid, Dimmer, Loader } from 'semantic-ui-react';
// import { updateAlbum } from '../../actions/artistActions';

const AlbumDetailsForm = props => {
  console.log(props);
  const [name, setName] = useState(props.currentAlbum[0].album_name);
  const [label, setLabel] = useState(props.currentAlbum[0].label);
  const [catId, setCatId] = useState(props.currentAlbum[0].cat_id);
  const [year, setYear] = useState(props.currentAlbum[0].year);
  const [spotifyId, setSpotifyId] = useState(props.currentAlbum[0].spotify_id);
  if (props.currentAlbum === null) {
    return (
      <Dimmer>
        <Loader>Ladataan...</Loader>
      </Dimmer>
    );
  }

  const saveChanges = () => {
    console.log('klikd save album');
    const albumToUpdate = {
      id: props.currentAlbum.album_id,
      name,
      label,
      cat_id: catId,
      year,
      spotify_id: spotifyId
    };
    console.log(albumToUpdate);
  };
  return (
    <Grid columns={2}>
      <Grid.Column>
        <h2>Albumin tiedot</h2>
        <Form>
          <Form.Field>
            <label>Artistin nimi</label>
            <Input
              disabled
              type="text"
              defaultValue={props.currentAlbum[0].artist_name}
            />
          </Form.Field>
          <Form.Field>
            <label>Albumi</label>
            <Input
              type="text"
              defaultValue={name}
              onChange={e => setName(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Levymerkki</label>
            <Input
              type="text"
              defaultValue={label}
              onChange={e => setLabel(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Levykoodi</label>
            <Input
              type="text"
              defaultValue={catId}
              onChange={e => setCatId(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Vuosi</label>
            <Input
              type="text"
              defaultValue={year}
              onChange={e => setYear(e.target.value)}
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

const connectedAlbumDetailsForm = connect(
  null,
  null
)(AlbumDetailsForm);

export default connectedAlbumDetailsForm;

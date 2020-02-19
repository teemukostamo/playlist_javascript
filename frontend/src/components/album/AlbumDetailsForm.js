/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Input, Button, Grid, Dimmer, Loader } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { updateAlbum } from '../../actions/albumActions';
import { setNotification } from '../../reducers/notificationReducer';

const AlbumDetailsForm = ({
  album_id,
  currentAlbum,
  updateAlbumConnect,
  setNotificationConnect
}) => {
  const [name, setName] = useState(currentAlbum[0].album_name);
  const [label, setLabel] = useState(currentAlbum[0].label);
  const [catId, setCatId] = useState(currentAlbum[0].cat_id);
  const [year, setYear] = useState(null);
  const [spotifyId, setSpotifyId] = useState(currentAlbum[0].spotify_id);
  useEffect(() => {
    if (currentAlbum[0].year === null) {
      setYear(null);
    } else {
      setYear(parseInt(currentAlbum[0].year));
    }
    // eslint-disable-next-line
  }, [currentAlbum[0].year]);
  if (currentAlbum === null) {
    return (
      <Dimmer>
        <Loader>Ladataan...</Loader>
      </Dimmer>
    );
  }

  const saveChanges = () => {
    const albumToUpdate = {
      id: album_id,
      name,
      label,
      cat_id: catId,
      year,
      spotify_id: spotifyId
    };
    updateAlbumConnect(albumToUpdate);
    setNotificationConnect(
      `Albumin ${albumToUpdate.name} tiedot päivitetty!`,
      'success'
    );
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
              type='text'
              defaultValue={currentAlbum[0].artist_name}
            />
            <span>
              <a href='!#'>Vaihda esittäjää </a> {'    '}
              <Link to={`../artist/${currentAlbum[0].artist_id}`}>
                Muokkaa esittäjän tietoja
              </Link>
            </span>
          </Form.Field>
          <Form.Field
            label='Albumi'
            control={Input}
            type='text'
            defaultValue={name}
            onChange={e => setName(e.target.value)}
          />
          <Form.Field
            label='Levymerkki'
            control={Input}
            type='text'
            defaultValue={label}
            onChange={e => setLabel(e.target.value)}
          />
          <Form.Field
            label='Levykoodi'
            control={Input}
            type='text'
            defaultValue={catId}
            onChange={e => setCatId(e.target.value)}
          />
          <Form.Field
            label='Vuosi'
            control={Input}
            type='number'
            defaultValue={year}
            onChange={e => setYear(e.target.value)}
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

AlbumDetailsForm.propTypes = {
  album_id: PropTypes.string,
  currentAlbum: PropTypes.arrayOf(
    PropTypes.shape({
      album_name: PropTypes.string,
      album_id: PropTypes.number,
      label: PropTypes.string,
      cat_id: PropTypes.string,
      spotify_id: PropTypes.string,
      year: PropTypes.string,
      artist_name: PropTypes.string,
      artist_id: PropTypes.number
    })
  ),
  updateAlbumConnect: PropTypes.func,
  setNotificationConnect: PropTypes.func
};

const connectedAlbumDetailsForm = connect(null, {
  updateAlbumConnect: updateAlbum,
  setNotificationConnect: setNotification
})(AlbumDetailsForm);

export default connectedAlbumDetailsForm;

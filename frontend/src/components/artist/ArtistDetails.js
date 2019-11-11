import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Container, Form, Input, Button, Grid } from 'semantic-ui-react';
import { getOneArtist } from '../../actions/artistActions';
import AlbumsByArtist from './AlbumsByArtist';

const ArtistDetails = props => {
  console.log('artist detail props', props);
  const [artist, setArtist] = useState('');
  useEffect(() => {
    props.getOneArtist(props.id);
  }, []);

  if (props.artist.currentArtist === null) {
    return <div>loading</div>;
  }
  return (
    <Container>
      <Grid columns={2}>
        <Grid.Column>
          <h2>Artistin tiedot</h2>
          <Form>
            <Form.Field>
              <label>Artistin nimi</label>
              <Input
                type="text"
                defaultValue={props.artist.currentArtist.name}
                onChange={e => setArtist(e.target.value)}
              />
            </Form.Field>
          </Form>
        </Grid.Column>
      </Grid>
      <AlbumsByArtist />
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    artist: state.artist
  };
};

const connectedArtistDetails = connect(
  mapStateToProps,
  { getOneArtist }
)(ArtistDetails);
export default connectedArtistDetails;

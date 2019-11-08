import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Table, Container, Dimmer, Loader } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Top100SearchForm from './Top100SearchForm';

const Top100List = props => {
  const [openArtistModal, setOpenArtistModal] = useState(false);

  const handleArtistModal = id => {
    console.log('klikd artist modal artist id', id);
    setOpenArtistModal(true);
  };
  const handleAlbumModal = id => {
    console.log('klikd album modal artist id', id);
    setOpenArtistModal(true);
  };
  const handleTrackModal = id => {
    console.log('klikd track modal artist id', id);
    setOpenArtistModal(true);
  };
  if (props.search.top100Query === null) {
    return (
      <Container>
        <h1>Top 100</h1>
        <Top100SearchForm />
      </Container>
    );
  }
  if (props.search.top100Query.list === 'artist_id')
    return (
      <Container>
        <h1>Top 100</h1>
        <Top100SearchForm />
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.Cell>Artisti</Table.Cell>
              <Table.Cell>Soittokerrat</Table.Cell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {props.search.top100.map(t => (
              <Table.Row key={t.track_id}>
                <Table.Cell>
                  <Link to="#" onClick={() => handleArtistModal(t.artist_id)}>
                    {t.artist}
                  </Link>
                </Table.Cell>
                <Table.Cell>{t.count}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Container>
    );
  if (props.search.top100Query.list === 'album_id')
    return (
      <Container>
        <h1>Top 100</h1>
        <Top100SearchForm />
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.Cell>Artisti</Table.Cell>
              <Table.Cell>Albumi</Table.Cell>
              <Table.Cell>Soittokerrat</Table.Cell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {props.search.top100.map(t => (
              <Table.Row key={t.track_id}>
                <Table.Cell>
                  <Link to="#" onClick={() => handleArtistModal(t.artist_id)}>
                    {t.artist}
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <Link to="#" onClick={() => handleAlbumModal(t.album_id)}>
                    {t.album}
                  </Link>
                </Table.Cell>
                <Table.Cell>{t.count}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Container>
    );
  if (props.search.top100Query.list === 'track_id')
    return (
      <Container>
        <h1>Top 100</h1>
        <Top100SearchForm />
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.Cell>Artisti</Table.Cell>
              <Table.Cell>Albumi</Table.Cell>
              <Table.Cell>Biisi</Table.Cell>
              <Table.Cell>Soittokerrat</Table.Cell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {props.search.top100.map(t => (
              <Table.Row key={t.track_id}>
                <Table.Cell>
                  <Link to="#" onClick={() => handleArtistModal(t.artist_id)}>
                    {t.artist}
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <Link to="#" onClick={() => handleAlbumModal(t.album_id)}>
                    {t.album}
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <Link to="#" onClick={() => handleTrackModal(t.track_id)}>
                    {t.track_title}
                  </Link>
                </Table.Cell>
                <Table.Cell>{t.count}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Container>
    );
};

const mapStateToProps = state => {
  console.log('top100', state);
  return {
    search: state.search
  };
};

const connectedTop100List = connect(
  mapStateToProps,
  null
)(Top100List);

export default connectedTop100List;

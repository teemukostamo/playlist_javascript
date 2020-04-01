import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Top100SearchForm from './Top100SearchForm';
import AddToCurrentReport from '../track/AddToCurrentReport';

const Top100List = ({ search }) => {
  if (search.top100Query === null) {
    return (
      <Container>
        <h1>Top 100</h1>
        <Top100SearchForm />
      </Container>
    );
  }
  if (search.loading) {
    return (
      <Container>
        <h1>Top 100</h1>
        <Top100SearchForm />
        <div>Loading</div>
      </Container>
    );
  }
  if (search.top100Query.list === 'artist_id') {
    return (
      <Container>
        <h1>Top 100</h1>
        <p>
          Hae eniten soitettuja biisejä, artisteja tai albumeita tietyllä
          aikavälillä.
        </p>
        <Top100SearchForm />
        <Table striped>
          <Table.Header>
            <Table.Row>
              <Table.Cell>Artisti</Table.Cell>
              <Table.Cell>Soittokerrat</Table.Cell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {search.top100.map(t => (
              <Table.Row key={t.track_id}>
                <Table.Cell>
                  <Link to={`/artist/${t.artist_id}`}>{t.artist}</Link>
                </Table.Cell>
                <Table.Cell>{t.count}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Container>
    );
  }
  if (search.top100Query.list === 'album_id') {
    return (
      <Container>
        <h1>Top 100</h1>
        <Top100SearchForm />
        <Table striped>
          <Table.Header>
            <Table.Row>
              <Table.Cell>Artisti</Table.Cell>
              <Table.Cell>Albumi</Table.Cell>
              <Table.Cell>Soittokerrat</Table.Cell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {search.top100.map(t => (
              <Table.Row key={t.track_id}>
                <Table.Cell>
                  <Link to={`/artist/${t.artist_id}`}>{t.artist}</Link>
                </Table.Cell>
                <Table.Cell>
                  <Link to={`/album/${t.album_id}`}>{t.album}</Link>
                </Table.Cell>
                <Table.Cell>{t.count}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Container>
    );
  }
  if (search.top100Query.list === 'track_id') {
    return (
      <Container>
        <h1>Top 100</h1>
        <Top100SearchForm />
        <Table striped>
          <Table.Header>
            <Table.Row>
              <Table.Cell>Artisti</Table.Cell>
              <Table.Cell>Albumi</Table.Cell>
              <Table.Cell>Biisi</Table.Cell>
              <Table.Cell>Soittokerrat</Table.Cell>
              <Table.Cell></Table.Cell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {search.top100.map(t => (
              <Table.Row key={t.track_id}>
                <Table.Cell>
                  <Link to={`/artist/${t.artist_id}`}>{t.artist}</Link>
                </Table.Cell>
                <Table.Cell>
                  <Link to={`/album/${t.album_id}`}>{t.album}</Link>
                </Table.Cell>
                <Table.Cell>
                  <Link to={`/track/${t.track_id}`}>{t.track_title}</Link>
                </Table.Cell>
                <Table.Cell>{t.count}</Table.Cell>
                <Table.Cell>
                  <AddToCurrentReport
                    track_title={t.track_title}
                    track_id={t.track_id}
                    length={t.length}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Container>
    );
  }
};

Top100List.propTypes = {
  search: PropTypes.shape({
    top100Query: PropTypes.shape({
      list: PropTypes.string,
      start_date: PropTypes.string,
      end_date: PropTypes.string
    }),
    top100: PropTypes.arrayOf(
      PropTypes.shape({
        count: PropTypes.number,
        track_id: PropTypes.number,
        track_title: PropTypes.string,
        album: PropTypes.string,
        artist: PropTypes.string,
        album_id: PropTypes.number,
        artist_id: PropTypes.number
      })
    )
  })
};

const mapStateToProps = state => {
  return {
    search: state.search
  };
};

const connectedTop100List = connect(mapStateToProps, null)(Top100List);

export default connectedTop100List;

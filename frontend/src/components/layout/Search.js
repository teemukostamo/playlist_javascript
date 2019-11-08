import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Form,
  Icon,
  Input,
  Button,
  Dropdown,
  Grid,
  Container
} from 'semantic-ui-react';

const Search = props => {
  const [searchString, setSearchString] = useState('');
  const [searchTarget, setSearchTarget] = useState('track_title');
  const [sortBy, setSortBy] = useState('track_title');

  const searchTargetOptions = [
    {
      key: 1,
      text: 'Biisi',
      value: 'track_title'
    },
    {
      key: 2,
      text: 'Artisti',
      value: 'artist'
    },
    {
      key: 3,
      text: 'Album',
      value: 'album'
    }
  ];
  const getSearchTarget = (e, { value }) => {
    e.preventDefault();
    setSearchTarget(value);
  };
  const sortOptions = [
    {
      key: 1,
      text: 'Biisin nimen mukaan',
      value: 'track_title'
    },
    {
      key: 2,
      text: 'Artistin mukaan',
      value: 'artist_name'
    },
    {
      key: 3,
      text: 'Luontipäivän mukaan',
      value: 'created_at'
    },
    {
      key: 4,
      text: 'Muokkauspäivän mukaan',
      value: 'updated_at'
    }
  ];
  const getSortOptions = (e, { value }) => {
    e.preventDefault();
    setSortBy(value);
  };

  const handleSearch = () => {
    const query = {
      string: searchString,
      target: searchTarget,
      sort_by: sortBy
    };
    console.log(query);
  };

  return (
    <Container>
      <h1>Haku</h1>
      <Grid columns={2}>
        <Grid.Column>
          <Form>
            <Form.Field>
              <label>Hakusana</label>
              <Input
                placeholder="Hakusana..."
                type="text"
                value={searchString}
                onChange={e => setSearchString(e.target.value)}
              />
            </Form.Field>
            <Form.Field>
              <label>Biisi / Artisti / Albumi</label>
              <Dropdown
                openOnFocus
                selection
                defaultValue={searchTarget}
                options={searchTargetOptions}
                onChange={getSearchTarget}
              />{' '}
            </Form.Field>

            <Form.Field>
              <label>Järjestä tulokset</label>
              <Dropdown
                openOnFocus
                selection
                defaultValue={sortBy}
                options={sortOptions}
                onChange={getSortOptions}
              />{' '}
            </Form.Field>
            <Button color="blue" onClick={handleSearch}>
              HAE
            </Button>
          </Form>
        </Grid.Column>
        <Grid.Column>
          <Button color="green" floated="right">
            <Icon name="add" />
            LISÄÄ UUSI BIISI
          </Button>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

const connectedSearch = connect(
  null,
  null
)(Search);

export default connectedSearch;

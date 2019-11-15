import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Dropdown, Grid } from 'semantic-ui-react';
import { advancedSearch } from '../../actions/searchActions';
import AddTrackModal from '../track/AddTrackModal';

const SearchForm = props => {
  const [searchString, setSearchString] = useState('');
  const [searchTarget, setSearchTarget] = useState('ar');
  const [sortBy, setSortBy] = useState('track_title');

  const searchTargetOptions = [
    {
      key: 1,
      text: 'Biisi',
      value: 'tr'
    },
    {
      key: 2,
      text: 'Artisti',
      value: 'ar'
    },
    {
      key: 3,
      text: 'Album',
      value: 'al'
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
    const searchParams = {
      query: searchString,
      kind: searchTarget
    };
    console.log(searchParams);
    props.advancedSearch(searchParams);
  };
  return (
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
        <span style={{ float: 'right' }}>
          <AddTrackModal />
        </span>
      </Grid.Column>
    </Grid>
  );
};

const connectedSearchForm = connect(
  null,
  { advancedSearch }
)(SearchForm);

export default connectedSearchForm;

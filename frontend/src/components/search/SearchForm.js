import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Dropdown, Grid } from 'semantic-ui-react';
import AddTrackBtn from './AddTrackBtn';
import { advancedSearch } from '../../actions/searchActions';

const SearchForm = props => {
  const [searchString, setSearchString] = useState('');
  const [searchTarget, setSearchTarget] = useState('ar');

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
            <label>Hae Biisin / Artistin / Albumin nimellä:</label>
            <Dropdown
              openOnFocus
              selection
              defaultValue={searchTarget}
              options={searchTargetOptions}
              onChange={getSearchTarget}
            />{' '}
          </Form.Field>
          <Button color="blue" onClick={handleSearch}>
            HAE
          </Button>
        </Form>
      </Grid.Column>
      <Grid.Column>
        <span style={{ float: 'right' }}>
          <AddTrackBtn />
        </span>
      </Grid.Column>
    </Grid>
  );
};

const connectedSearchForm = connect(null, { advancedSearch })(SearchForm);

export default connectedSearchForm;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Input, Button, Dropdown, Grid } from 'semantic-ui-react';
import AddTrackBtn from './AddTrackBtn';
import { advancedSearch } from '../../actions/searchActions';

const SearchForm = ({ advancedSearchConnect }) => {
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
    advancedSearchConnect(searchParams);
  };
  return (
    <Grid columns={2}>
      <Grid.Column>
        <Form>
          <Form.Field
            control={Input}
            placeholder='Hakusana...'
            type='text'
            value={searchString}
            onChange={e => setSearchString(e.target.value)}
            label='Hakusana'
          />
          <Form.Field
            control={Dropdown}
            openOnFocus
            selection
            defaultValue={searchTarget}
            options={searchTargetOptions}
            onChange={getSearchTarget}
            label='Hae Biisin / Artistin / Albumin nimellä:'
          />
          <Button color='blue' onClick={handleSearch}>
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

SearchForm.propTypes = {
  advancedSearchConnect: PropTypes.func.isRequired
};

const connectedSearchForm = connect(null, {
  advancedSearchConnect: advancedSearch
})(SearchForm);

export default connectedSearchForm;

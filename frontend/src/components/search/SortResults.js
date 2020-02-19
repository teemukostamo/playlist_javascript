import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Dropdown, Grid } from 'semantic-ui-react';
import { sortAdvancedResults } from '../../actions/searchActions';

const SortResults = ({ sortAdvancedResultsConnect }) => {
  const [sortBy, setSortBy] = useState(1);

  useEffect(() => {
    sortAdvancedResultsConnect(sortBy);
    // eslint-disable-next-line
  }, [sortBy]);

  const sortOptions = [
    {
      key: 1,
      text: 'Biisin nimen mukaan',
      value: 1
    },
    {
      key: 2,
      text: 'Artistin nimen mukaan',
      value: 2
    }
  ];
  const getSortOptions = (e, { value }) => {
    e.preventDefault();
    setSortBy(value);
  };
  return (
    <Grid columns={4}>
      <Grid.Column>
        <Form>
          <Form.Field
            control={Dropdown}
            defaultValue={sortBy}
            openOnFocus
            selection
            options={sortOptions}
            onChange={getSortOptions}
            label='Järjestä tulokset'
          />
        </Form>
      </Grid.Column>
    </Grid>
  );
};

SortResults.propTypes = {
  sortAdvancedResultsConnect: PropTypes.func
};

const connectedSortResult = connect(null, {
  sortAdvancedResultsConnect: sortAdvancedResults
})(SortResults);

export default connectedSortResult;

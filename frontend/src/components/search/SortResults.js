import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Dropdown, Grid } from 'semantic-ui-react';
import { sortAdvancedResults } from '../../actions/searchActions';

const SortResults = props => {
  console.log('sort props', props);
  const [sortBy, setSortBy] = useState(1);

  useEffect(() => {
    console.log(sortBy);
    props.sortAdvancedResults(sortBy);
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
    console.log(sortBy);
    setSortBy(value);
  };
  return (
    <Grid columns={4}>
      <Grid.Column>
        <Form>
          <Form.Field>
            <label>Järjestä tulokset</label>
            <Dropdown
              defaultValue={sortBy}
              openOnFocus
              selection
              options={sortOptions}
              onChange={getSortOptions}
            />{' '}
          </Form.Field>
        </Form>
      </Grid.Column>
    </Grid>
  );
};
const mapStateToProps = state => {
  return {
    search: state.search
  };
};

const connectedSortResult = connect(mapStateToProps, { sortAdvancedResults })(
  SortResults
);

export default connectedSortResult;

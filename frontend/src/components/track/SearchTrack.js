import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getAutocompleteResults } from '../../actions/searchActions';

const SearchTrack = props => {
  console.log('search track props', props);
  const [searchQuery, setSearchQuery] = useState('');
  console.log(searchQuery);

  useEffect(() => {
    if (searchQuery.length >= 3) {
      setTimeout(() => {
        props.getAutocompleteResults(searchQuery);
      }, 300);
    }
  });

  return (
    <div>
      <input type="text" onChange={e => setSearchQuery(e.target.value)} />
    </div>
  );
};

const mapStateToProps = state => {
  console.log('search track state to props', state);
  return {
    search: state.search
  };
};
const connectedSearchTrack = connect(
  mapStateToProps,
  { getAutocompleteResults }
)(SearchTrack);

export default connectedSearchTrack;

import React from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
const Search = props => {
  return (
    <Container>
      <h1>Haku</h1>
      <SearchForm />
      <SearchResults />
    </Container>
  );
};

const connectedSearch = connect(
  null,
  null
)(Search);

export default connectedSearch;

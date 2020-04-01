import React from 'react';
import { Container } from 'semantic-ui-react';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';

const Search = () => {
  return (
    <Container>
      <h1>Haku</h1>
      <SearchForm />
      <SearchResults />
    </Container>
  );
};

export default Search;

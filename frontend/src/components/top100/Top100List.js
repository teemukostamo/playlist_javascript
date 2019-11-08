import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Table,
  Container,
  Header,
  Form,
  Button,
  Dropdown,
  Segment,
  Grid,
  Dimmer,
  Loader
} from 'semantic-ui-react';
import Top100SearchForm from './Top100SearchForm';

const Top100List = props => {
  return (
    <Container>
      <h1>Top 100</h1>
      <Top100SearchForm />
      <Table>
        <Table.Header>
          <Table.Cell>Esittäjä</Table.Cell>
          <Table.Cell>Biisi</Table.Cell>
          <Table.Cell>Albumi</Table.Cell>
          <Table.Cell>Soittokerrat</Table.Cell>
        </Table.Header>
      </Table>
    </Container>
  );
};

const mapStateToProps = state => {
  console.log('top100', state);
  return {
    search: state.search
  };
};

const connectedTop100List = connect(
  mapStateToProps,
  null
)(Top100List);

export default connectedTop100List;

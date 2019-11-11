import React, { useState } from 'react';
import { Table } from 'semantic-ui-react';

const AlbumsByArtist = props => {
  return (
    <React.Fragment>
      <h4>Albumit</h4>
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.Cell>ID#</Table.Cell>
            <Table.Cell>Nimi</Table.Cell>
            <Table.Cell>Levykoodi</Table.Cell>
            <Table.Cell>Biisejä</Table.Cell>
            <Table.Cell>Raportit</Table.Cell>
            <Table.Cell></Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body></Table.Body>
      </Table>
    </React.Fragment>
  );
};

export default AlbumsByArtist;

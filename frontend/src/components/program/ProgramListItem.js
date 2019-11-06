import React, { useState } from 'react';
import { connect } from 'react-redux';
import ModalNotification from '../layout/ModalNotification';
import { setNotification } from '../../reducers/notificationReducer';
import {
  Table,
  Container,
  Dimmer,
  Loader,
  Modal,
  Header,
  Form,
  Button,
  Input,
  Icon
} from 'semantic-ui-react';

const ProgramListItem = props => {
  console.log('program list item props', props);
  const onDelete = () => {
    console.log('klikd delete');
  };
  if (props.program === null) {
    return (
      <Container>
        <Dimmer active inverted>
          <Loader size="medium">Haetaan Ohjelmia...</Loader>
        </Dimmer>
      </Container>
    );
  }
  return (
    <Table.Row>
      <Table.Cell>{props.program.id}</Table.Cell>
      <Table.Cell>{props.program.name}</Table.Cell>
      <Table.Cell>{props.program.identifier}</Table.Cell>
      <Table.Cell>
        <Icon color="red" onClick={onDelete} name="delete" />
      </Table.Cell>
    </Table.Row>
  );
};

const connectedProgramListItem = connect(
  null,
  null
)(ProgramListItem);

export default connectedProgramListItem;

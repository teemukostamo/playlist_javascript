import React, { useState } from 'react';
import { connect } from 'react-redux';
import EditProgramModal from './EditProgramModal';
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

  let className;
  if (props.program.display === 1) {
    className = 'active-program';
  }

  return (
    <Table.Row className={className}>
      <Table.Cell>{props.program.id}</Table.Cell>
      {/* <Table.Cell>{props.program.name}</Table.Cell> */}
      <Table.Cell>
        <EditProgramModal program={props.program} />
      </Table.Cell>
      <Table.Cell>{props.program.identifier}</Table.Cell>
    </Table.Row>
  );
};

const connectedProgramListItem = connect(
  null,
  { setNotification }
)(ProgramListItem);

export default connectedProgramListItem;

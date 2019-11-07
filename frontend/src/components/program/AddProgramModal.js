import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createNewProgram } from '../../actions/programActions';
import { setNotification } from '../../reducers/notificationReducer';
import {
  Modal,
  Header,
  Form,
  Button,
  Input,
  Popup,
  Icon
} from 'semantic-ui-react';

const AddProgramModal = props => {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [display, setDisplay] = useState(false);
  const [site, setSite] = useState(false);

  const handleOpen = () => {
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
  };

  const addProgram = () => {
    const programToAdd = {
      display,
      identifier,
      name,
      site,
      user_id: props.login.id
    };
    console.log('klikd add program', programToAdd);
    props.createNewProgram(programToAdd);
    props.setNotification(`${programToAdd.name} lisätty!`, 'success');
    handleClose();
  };

  return (
    <Modal
      trigger={
        <Button onClick={handleOpen} floated="right" color="green">
          Luo uusi ohjelma
        </Button>
      }
      closeIcon
      open={modalOpen}
      onClose={handleClose}
    >
      <Header content="Lisää ohjelma" />
      <Modal.Content>
        <Form onSubmit={addProgram}>
          <Form.Field>
            <label>Ohjelman nimi</label>
            <Input
              focus
              type="text"
              placeholder="Ohjelman nimi..."
              onChange={e => setName(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Ohjelman tarkenne</label>
            <Input
              focus
              type="text"
              placeholder="Ohjelman tarkenne..."
              onChange={e => setIdentifier(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>
              Aktiivinen{' '}
              <Popup
                trigger={
                  <Icon style={{ display: 'inline' }} name="question circle" />
                }
                content="Aktiiviset ohjelmat näkyy Luo uusi raportti -sivun ohjelmalistalla"
                style={style}
                inverted
              />
            </label>
            <Form.Checkbox
              name="active"
              onChange={() => setDisplay(!display)}
              checked={display ? true : false}
            />
          </Form.Field>
          <Form.Field>
            <label>
              Näytä saitin hakulistassa{' '}
              <Popup
                trigger={
                  <Icon style={{ display: 'inline' }} name="question circle" />
                }
                content="Liittyy vanhaan saittiin jossa pääsi selaamaan raportteja per ohjelma"
                style={style}
                inverted
              />
            </label>
            <Form.Checkbox
              name="site"
              onChange={() => setSite(!site)}
              checked={site ? true : false}
            />
          </Form.Field>
          <Button color="green" type="submit" disabled={!name}>
            Tallenna
          </Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

const style = {
  borderRadius: 0,
  display: 'block',
  opacity: 0.9,
  padding: '2em'
};

const mapStateToProps = state => {
  return {
    login: state.login
  };
};
const connectedAddProgramModal = connect(
  mapStateToProps,
  { setNotification, createNewProgram }
)(AddProgramModal);

export default connectedAddProgramModal;

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateProgram } from '../../actions/programActions';
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

const EditProgramModal = props => {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState(props.program.name);
  const [identifier, setIdentifier] = useState(props.program.identifier);
  const [display, setDisplay] = useState(props.program.display);
  const [site, setSite] = useState(props.program.site);

  const handleOpen = () => {
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
  };

  const updateProgram = () => {
    const updatedProgram = {
      id: props.program.id,
      display,
      identifier,
      name,
      site,
      user_id: props.program.user_id
    };
    console.log('klikd update program', updatedProgram);
    props.updateProgram(updatedProgram);
    props.setNotification(`${updatedProgram.name} päivitetty!`, 'success');
    handleClose();
  };

  const getDisplay = () => {
    console.log('getting display');
    if (display === null) {
      setDisplay(1);
    } else {
      setDisplay(null);
    }
  };

  const getSite = () => {
    console.log('getting display');
    if (site === null) {
      setSite(1);
    } else {
      setSite(null);
    }
  };

  return (
    <Modal
      trigger={
        <a href="#!" onClick={handleOpen}>
          {props.program.name}
        </a>
      }
      closeIcon
      open={modalOpen}
      onClose={handleClose}
    >
      <Header content="Muokkaa ohjelman tietoja" />
      <Modal.Content>
        <Form onSubmit={updateProgram}>
          <Form.Field>
            <label>Ohjelman nimi</label>
            <Input
              focus
              type="text"
              defaultValue={name}
              onChange={e => setName(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Ohjelman lisätieto</label>
            <Input
              focus
              type="text"
              defaultValue={identifier}
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
              onChange={getDisplay}
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
              name="active"
              onChange={getSite}
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
    programs: state.programs
  };
};

const connectedEditProgramModal = connect(
  mapStateToProps,
  { setNotification, updateProgram }
)(EditProgramModal);

export default connectedEditProgramModal;

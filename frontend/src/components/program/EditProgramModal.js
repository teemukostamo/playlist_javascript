import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Modal,
  Header,
  Form,
  Button,
  Input,
  Popup,
  Icon
} from 'semantic-ui-react';
import { updateProgram } from '../../actions/programActions';
import { setNotification } from '../../reducers/notificationReducer';

const style = {
  borderRadius: 0,
  display: 'block',
  opacity: 0.9,
  padding: '2em'
};

const EditProgramModal = ({
  program,
  updateProgramConnect,
  setNotificationConnect
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState(program.name);
  const [identifier, setIdentifier] = useState(program.identifier);
  const [display, setDisplay] = useState(program.display);
  const [site, setSite] = useState(program.site);

  const handleOpen = () => {
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
  };

  const handleUpdateClick = () => {
    const updatedProgram = {
      id: program.id,
      display,
      identifier,
      name,
      site,
      user_id: program.user_id
    };
    updateProgramConnect(updatedProgram);
    setNotificationConnect(`${updatedProgram.name} päivitetty!`, 'success');
    handleClose();
  };

  const getDisplay = () => {
    if (display === null) {
      setDisplay(1);
    } else {
      setDisplay(null);
    }
  };

  const getSite = () => {
    if (site === null) {
      setSite(1);
    } else {
      setSite(null);
    }
  };

  return (
    <Modal
      trigger={
        <a href='#!' onClick={handleOpen}>
          {program.name}
        </a>
      }
      closeIcon
      open={modalOpen}
      onClose={handleClose}
    >
      <Header content='Muokkaa ohjelman tietoja' />
      <Modal.Content>
        <Form onSubmit={handleUpdateClick}>
          <Form.Field
            label='Ohjelman nimi'
            control={Input}
            focus
            type='text'
            defaultValue={name}
            onChange={e => setName(e.target.value)}
          />

          <Form.Field
            label='Ohjelman lisätieto'
            control={Input}
            focus
            type='text'
            defaultValue={identifier}
            onChange={e => setIdentifier(e.target.value)}
          />

          <Form.Field
            control={Form.Checkbox}
            name='active'
            onChange={getDisplay}
            checked={!!display}
            label={
              <span>
                Aktiivinen{' '}
                <Popup
                  trigger={
                    <Icon
                      style={{ display: 'inline' }}
                      name='question circle'
                    />
                  }
                  content='Aktiiviset ohjelmat näkyy Luo uusi raportti -sivun ohjelmalistalla'
                  style={style}
                  inverted
                />
              </span>
            }
          />
          <Form.Field
            control={Form.Checkbox}
            name='active'
            onChange={getSite}
            checked={!!site}
            label={
              <span>
                Näytä saitin hakulistassa{' '}
                <Popup
                  trigger={
                    <Icon
                      style={{ display: 'inline' }}
                      name='question circle'
                    />
                  }
                  content='Liittyy vanhaan saittiin jossa pääsi selaamaan raportteja per ohjelma'
                  style={style}
                  inverted
                />
              </span>
            }
          />
          <Button color='green' type='submit' disabled={!name}>
            Tallenna
          </Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

EditProgramModal.propTypes = {
  program: PropTypes.shape({
    created_at: PropTypes.string,
    display: PropTypes.number,
    id: PropTypes.number,
    identifier: PropTypes.string,
    name: PropTypes.string,
    site: PropTypes.number,
    updated_at: PropTypes.string,
    user_id: PropTypes.number
  }).isRequired,
  updateProgramConnect: PropTypes.func.isRequired,
  setNotificationConnect: PropTypes.func
};

const connectedEditProgramModal = connect(null, {
  setNotificationConnect: setNotification,
  updateProgramConnect: updateProgram
})(EditProgramModal);

export default connectedEditProgramModal;

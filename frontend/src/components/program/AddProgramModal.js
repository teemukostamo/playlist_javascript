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
import { createNewProgram } from '../../actions/programActions';
import { setNotification } from '../../reducers/notificationReducer';

const style = {
  borderRadius: 0,
  display: 'block',
  opacity: 0.9,
  padding: '2em'
};

const AddProgramModal = ({
  login,
  createNewProgramConnect,
  setNotificationConnect
}) => {
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
      user_id: login.id
    };
    createNewProgramConnect(programToAdd);
    setNotificationConnect(`${programToAdd.name} lisätty!`, 'success');
    handleClose();
  };

  return (
    <Modal
      trigger={
        <Button onClick={handleOpen} floated='right' color='green'>
          Luo uusi ohjelma
        </Button>
      }
      closeIcon
      open={modalOpen}
      onClose={handleClose}
    >
      <Header content='Lisää ohjelma' />
      <Modal.Content>
        <Form onSubmit={addProgram}>
          <Form.Field
            label='Ohjelman nimi'
            control={Input}
            focus
            type='text'
            placeholder='Ohjelman nimi...'
            onChange={e => setName(e.target.value)}
          />
          <Form.Field
            label='Ohjelman tarkenne'
            control={Input}
            focus
            type='text'
            placeholder='Ohjelman tarkenne...'
            onChange={e => setIdentifier(e.target.value)}
          />

          <Form.Field
            control={Form.Checkbox}
            name='active'
            onChange={() => setDisplay(!display)}
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
            name='site'
            onChange={() => setSite(!site)}
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

AddProgramModal.propTypes = {
  createNewProgramConnect: PropTypes.func,
  setNotificationConnect: PropTypes.func,
  login: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    id: PropTypes.number,
    level: PropTypes.number,
    loading: PropTypes.bool,
    status: PropTypes.number,
    token: PropTypes.string,
    username: PropTypes.string
  })
};

const mapStateToProps = state => {
  return {
    login: state.login
  };
};
const connectedAddProgramModal = connect(mapStateToProps, {
  setNotificationConnect: setNotification,
  createNewProgramConnect: createNewProgram
})(AddProgramModal);

export default connectedAddProgramModal;

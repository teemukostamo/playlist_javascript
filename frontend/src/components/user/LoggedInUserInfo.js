import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, Header, Form, Button, Input } from 'semantic-ui-react';
import ModalNotification from '../layout/ModalNotification';
import { updateUser } from '../../actions/userActions';
import { updateCurrentUser } from '../../actions/loginActions';
import { setNotification } from '../../reducers/notificationReducer';

const LoggedInUserModal = ({
  login,
  updateUserConnect,
  updateCurrentUserConnect,
  setNotificationConnect
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState(login.first_name);
  const [lastName, setLastName] = useState(login.last_name);
  const [email, setEmail] = useState(login.email);

  const handleOpen = () => {
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
  };

  const updateUserClick = () => {
    if (password.length === 0 && confirmPassword.length === 0) {
      const userToUpdate = {
        id: login.id,
        first_name: firstName,
        last_name: lastName,
        email
      };
      updateCurrentUserConnect(userToUpdate);
      updateUserConnect(userToUpdate);
      setNotificationConnect('Omat tiedot päivitetty!', 'success');
      handleClose();
    } else if (password !== confirmPassword || password.length <= 3) {
      setNotificationConnect('Tarkasta salasanat!', 'fail');
    } else {
      const userToUpdate = {
        id: login.id,
        password,
        first_name: firstName,
        last_name: lastName,
        email
      };
      handleClose();
      updateCurrentUserConnect(userToUpdate);
      updateUserConnect(userToUpdate);
      setNotificationConnect('Omat tiedot päivitetty!', 'success');
    }
  };

  return (
    <Modal
      trigger={
        <span role='menuitem' tabIndex='-8' onClick={handleOpen}>
          Omat tiedot
        </span>
      }
      closeIcon
      open={modalOpen}
      onClose={handleClose}
    >
      <Header content='Muokkaa tietoja' />
      <Modal.Content>
        <Form onSubmit={updateUserClick}>
          <Form.Field
            control={Input}
            focus
            type='password'
            placeholder='Salasana...'
            onChange={e => setPassword(e.target.value)}
            label={
              <React.Fragment>
                <span>Salasana - syötä vaihtaaksesi</span>
                {'  '}
                <ModalNotification />
              </React.Fragment>
            }
          />
          <Form.Field
            control={Input}
            focus
            type='password'
            placeholder='Vahvista salasana...'
            onChange={e => setConfirmPassword(e.target.value)}
            label={
              <React.Fragment>
                <span>Salasana uudelleen</span>
                {'  '}
                <ModalNotification />
              </React.Fragment>
            }
          />
          <Form.Field
            control={Input}
            focus
            defaultValue={firstName}
            type='text'
            placeholder='Etunimi...'
            onChange={e => setFirstName(e.target.value)}
            label='Etunimi'
          />
          <Form.Field
            control={Input}
            focus
            defaultValue={lastName}
            type='text'
            placeholder='Sukunimi...'
            onChange={e => setLastName(e.target.value)}
            label='Sukunimi'
          />
          <Form.Field
            control={Input}
            focus
            defaultValue={email}
            type='email'
            placeholder='Email...'
            onChange={e => setEmail(e.target.value)}
            label='Email'
          />
          <Button
            color='green'
            type='submit'
            disabled={!email || !firstName || !lastName}
          >
            Tallenna
          </Button>
          <ModalNotification />
        </Form>
      </Modal.Content>
    </Modal>
  );
};

LoggedInUserModal.propTypes = {
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
  }),
  updateUserConnect: PropTypes.func,
  updateCurrentUserConnect: PropTypes.func,
  setNotificationConnect: PropTypes.func
};

const mapStateToProps = state => {
  return {
    login: state.login
  };
};

const connectedLoggedInUserModal = connect(mapStateToProps, {
  setNotificationConnect: setNotification,
  updateUserConnect: updateUser,
  updateCurrentUserConnect: updateCurrentUser
})(LoggedInUserModal);

export default connectedLoggedInUserModal;

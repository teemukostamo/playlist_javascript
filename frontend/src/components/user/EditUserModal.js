import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Modal,
  Header,
  Form,
  Button,
  Input,
  Dropdown
} from 'semantic-ui-react';
import { updateUser } from '../../actions/userActions';
import { setNotification } from '../../reducers/notificationReducer';
import ModalNotification from '../layout/ModalNotification';

const EditUserModal = ({ user, setNotificationConnect, updateUserConnect }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);
  const [level, setLevel] = useState(user.level);
  const [status, setStatus] = useState(user.status);

  const handleOpen = () => {
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
  };

  const updateUserClick = () => {
    if (password.length === 0 && confirmPassword.length === 0) {
      const userToUpdate = {
        id: user.id,
        first_name: firstName,
        last_name: lastName,
        email,
        level,
        status
      };
      setNotificationConnect(
        `Käyttäjän ${userToUpdate.first_name} ${userToUpdate.last_name} tiedot päivitetty!`,
        'success'
      );
      updateUserConnect(userToUpdate);
      handleClose();
    } else if (password !== confirmPassword || password.length <= 3) {
      setNotificationConnect('Tarkasta salasanat!', 'fail');
    } else {
      const userToUpdate = {
        id: user.id,
        password,
        first_name: firstName,
        last_name: lastName,
        email,
        level,
        status
      };
      updateUserConnect(userToUpdate);
      setNotificationConnect(
        `Käyttäjän ${userToUpdate.first_name} ${userToUpdate.last_name} tiedot päivitetty!`,
        'success'
      );
      handleClose();
    }
  };

  const levelOptions = [
    {
      key: 1,
      text: 'DJ',
      value: 1
    },
    {
      key: 2,
      text: 'Toimitus',
      value: 2
    },
    {
      key: 3,
      text: 'Admin',
      value: 3
    }
  ];
  const getLevel = (event, { value }) => {
    event.preventDefault();
    setLevel(value);
  };

  const getStatus = () => {
    if (status === null) {
      setStatus(1);
    } else {
      setStatus(null);
    }
  };

  return (
    <Modal
      trigger={
        <a href='#!' onClick={handleOpen}>
          {user.username}
        </a>
      }
      closeIcon
      open={modalOpen}
      onClose={handleClose}
    >
      <Header content='Muokkaa käyttäjän tietoja' />
      <Modal.Content>
        <Form onSubmit={updateUserClick}>
          <Form.Field
            control={Input}
            defaultValue={user.username}
            type='text'
            placeholder='Käyttäjätunnus...'
            disabled
            label='Käyttäjätunnus'
          />
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
          <Form.Field
            control={Dropdown}
            selection
            defaultValue={user.level}
            options={levelOptions}
            onChange={getLevel}
            label='Taso'
          />
          <Form.Field
            control={Form.Checkbox}
            name='active'
            onChange={getStatus}
            checked={!!status}
            label='Tunnus käytössä'
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

EditUserModal.propTypes = {
  user: PropTypes.shape({
    address: PropTypes.string,
    city: PropTypes.string,
    country: PropTypes.string,
    created_at: PropTypes.string,
    email: PropTypes.string,
    first_name: PropTypes.string,
    id: PropTypes.number,
    last_name: PropTypes.string,
    last_seen: PropTypes.string,
    level: PropTypes.number,
    old_id: PropTypes.number,
    phone: PropTypes.string,
    reset_key: PropTypes.string,
    status: PropTypes.number,
    updated_at: PropTypes.string,
    username: PropTypes.string,
    zip: PropTypes.string
  }),
  updateUserConnect: PropTypes.func,
  setNotificationConnect: PropTypes.func
};

const connectedEditUserModal = connect(null, {
  setNotificationConnect: setNotification,
  updateUserConnect: updateUser
})(EditUserModal);

export default connectedEditUserModal;

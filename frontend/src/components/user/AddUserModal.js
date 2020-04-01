import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Modal,
  Header,
  Form,
  Button,
  Input,
  Icon,
  Dropdown
} from 'semantic-ui-react';
import { createUser } from '../../actions/userActions';
import { setNotification } from '../../reducers/notificationReducer';

const AddUserModal = props => {
  const [modalOpen, setModalOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [level, setLevel] = useState(1);
  const [status, setStatus] = useState(null);

  const handleOpen = () => {
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
  };

  const createUserButtonClick = () => {
    if (password !== confirmPassword) {
      props.setNotification('Salasanat eivät täsmää!', 'fail');
    }
    const userToAdd = {
      username,
      password,
      first_name: firstName,
      last_name: lastName,
      email,
      level,
      status
    };
    props.createUser(userToAdd);
    props.setNotification(`${userToAdd.username} lisätty!`, 'success');
    handleClose();
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
        <Button
          style={{ marginBottom: '0.5rem' }}
          onClick={handleOpen}
          floated='right'
          color='green'
        >
          <Icon name='add' />
          LUO UUSI KÄYTTÄJÄ
        </Button>
      }
      closeIcon
      open={modalOpen}
      onClose={handleClose}
    >
      <Header content='Luo uusi käyttäjä' />
      <Modal.Content>
        <Form onSubmit={createUserButtonClick}>
          <Form.Field
            required
            control={Input}
            type='text'
            placeholder='Käyttäjätunnus...'
            onChange={e => setUsername(e.target.value)}
            label='Käyttäjätunnus'
          />
          <Form.Field
            required
            control={Input}
            focus
            type='password'
            placeholder='Salasana...'
            onChange={e => setPassword(e.target.value)}
            label='Salasana'
          />
          <Form.Field
            required
            control={Input}
            focus
            type='password'
            placeholder='Vahvista salasana...'
            onChange={e => setConfirmPassword(e.target.value)}
            label='Salasana uudelleen'
          />
          <Form.Field
            required
            control={Input}
            focus
            type='text'
            placeholder='Etunimi...'
            onChange={e => setFirstName(e.target.value)}
            label='Etunimi'
          />
          <Form.Field
            required
            control={Input}
            focus
            type='text'
            placeholder='Sukunimi...'
            onChange={e => setLastName(e.target.value)}
            label='Sukunimi'
          />
          <Form.Field
            required
            control={Input}
            focus
            type='email'
            placeholder='Email...'
            onChange={e => setEmail(e.target.value)}
            label='Email'
          />
          <Form.Field
            required
            control={Dropdown}
            selection
            defaultValue={level}
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
            disabled={
              !username ||
              !password ||
              !confirmPassword ||
              !email ||
              !firstName ||
              !lastName
            }
          >
            Tallenna
          </Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

AddUserModal.propTypes = {
  setNotification: PropTypes.func,
  createUser: PropTypes.func
};

const connectedAddUserModal = connect(null, { setNotification, createUser })(
  AddUserModal
);

export default connectedAddUserModal;

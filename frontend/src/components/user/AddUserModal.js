import React, { useState } from 'react';
import { connect } from 'react-redux';
// import { createUser } from '../../actions/userActions';
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

const AddUserModal = props => {
  const [modalOpen, setModalOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [level, setLevel] = useState('');
  const [status, setStatus] = useState('');

  const handleOpen = () => {
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
  };

  const createUser = () => {
    if (password !== confirmPassword) {
      props.setNotification(`Salasanat eivät täsmää!`, 'fail');
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
    console.log('klikd create user', userToAdd);
    // props.createUser(userToAdd);
    props.setNotification(`${userToAdd.username} lisätty!`, 'success');
    handleClose();
  };

  return (
    <Modal
      trigger={
        <Button onClick={handleOpen} floated="right" color="green">
          Luo uusi käyttäjä
        </Button>
      }
      closeIcon
      open={modalOpen}
      onClose={handleClose}
    >
      <Header content="Luo uusi käyttäjä" />
      <Modal.Content>
        <Form onSubmit={createUser}>
          <Form.Field>
            <label>Käyttäjätunnus</label>
            <Input
              type="text"
              placeholder="Käyttäjätunnus..."
              onChange={e => setUsername(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Salasana</label>
            <Input
              focus
              type="password"
              placeholder="Salasana..."
              onChange={e => setPassword(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Salasana uudelleen</label>
            <Input
              focus
              type="password"
              placeholder="Vahvista salasana..."
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Etunimi</label>
            <Input
              focus
              type="text"
              placeholder="Etunimi..."
              onChange={e => setFirstName(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Sukunimi</label>
            <Input
              focus
              type="text"
              placeholder="Sukunimi..."
              onChange={e => setLastName(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <Input
              focus
              type="email"
              placeholder="Email..."
              onChange={e => setEmail(e.target.value)}
            />
          </Form.Field>
          <Form.Field
            label="Taso"
            control="select"
            onChange={e => setLevel(e.target.value)}
          >
            <option value="1">DJ</option>
            <option value="2">Toimitus</option>
            <option value="3">Admin</option>
          </Form.Field>
          <Form.Field
            label="Tila"
            control="select"
            onChange={e => setStatus(e.target.value)}
          >
            <option value="1">Käytössä</option>
            <option value={null}>Hyllyllä</option>
          </Form.Field>
          <Button
            color="green"
            type="submit"
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

const connectedAddUserModal = connect(
  null,
  { setNotification }
)(AddUserModal);

export default connectedAddUserModal;

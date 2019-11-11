import React, { useState } from 'react';
import { connect } from 'react-redux';
import ModalNotification from '../layout/ModalNotification';
import { updateUser } from '../../actions/userActions';
import { setNotification } from '../../reducers/notificationReducer';
import { Modal, Header, Form, Button, Input } from 'semantic-ui-react';

const LoggedInUserModal = props => {
  const [modalOpen, setModalOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState(props.login.first_name);
  const [lastName, setLastName] = useState(props.login.last_name);
  const [email, setEmail] = useState(props.login.email);

  const handleOpen = () => {
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
  };

  const updateUserClick = () => {
    if (password.length === 0 && confirmPassword.length === 0) {
      const userToUpdate = {
        id: props.login.id,
        first_name: firstName,
        last_name: lastName,
        email
      };
      console.log('updting info', userToUpdate);
      props.updateUser(userToUpdate);
    } else if (password !== confirmPassword || password.length <= 3) {
      props.setNotification('Tarkasta salasanat!', 'fail');
    } else {
      const userToUpdate = {
        id: props.login.id,
        password,
        first_name: firstName,
        last_name: lastName,
        email
      };
      console.log('updting info', userToUpdate);
      handleClose();
      props.updateUser(userToUpdate);
    }
    // if (!firstName || !lastName) {
    //   props.setNotification(
    //     'Etunimi ja sukunimi ovat pakollisia tietoja',
    //     'fail'
    //   );
    // }
  };

  return (
    <Modal
      trigger={<span onClick={handleOpen}>Omat tiedot</span>}
      closeIcon
      open={modalOpen}
      onClose={handleClose}
    >
      <Header content="Muokkaa tietoja" />
      <Modal.Content>
        <Form onSubmit={updateUserClick}>
          <Form.Field>
            <ModalNotification />
            <label>Salasana - syötä vaihtaaksesi</label>
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
            <ModalNotification />
            <label>Etunimi</label>
            <Input
              focus
              defaultValue={firstName}
              type="text"
              placeholder="Etunimi..."
              onChange={e => setFirstName(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Sukunimi</label>
            <Input
              focus
              defaultValue={lastName}
              type="text"
              placeholder="Sukunimi..."
              onChange={e => setLastName(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <Input
              focus
              defaultValue={email}
              type="email"
              placeholder="Email..."
              onChange={e => setEmail(e.target.value)}
            />
          </Form.Field>
          <Button
            color="green"
            type="submit"
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

const mapStateToProps = state => {
  console.log('app state', state);
  return {
    login: state.login
  };
};

const connectedLoggedInUserModal = connect(
  mapStateToProps,
  { setNotification, updateUser }
)(LoggedInUserModal);

export default connectedLoggedInUserModal;

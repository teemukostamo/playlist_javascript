import React, { useState } from 'react';
import { connect } from 'react-redux';
// import { updateProgram } from '../../actions/programActions';
import { setNotification } from '../../reducers/notificationReducer';
import ModalNotification from '../layout/ModalNotification';

import {
  Modal,
  Header,
  Form,
  Button,
  Input,
  Dropdown,
  Popup,
  Icon
} from 'semantic-ui-react';

const EditUserModal = props => {
  const [modalOpen, setModalOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState(props.user.first_name);
  const [lastName, setLastName] = useState(props.user.last_name);
  const [email, setEmail] = useState(props.user.email);
  const [level, setLevel] = useState(props.user.level);
  const [status, setStatus] = useState(props.user.status);

  const handleOpen = () => {
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
  };

  const updateUserClick = e => {
    e.preventDefault();
    if (password !== confirmPassword || password.length <= 3) {
      props.setNotification('Tarkasta salasanat!', 'fail');
    }
    if (!firstName || !lastName) {
      props.setNotification(
        'Etunimi ja sukunimi ovat pakollisia tietoja',
        'fail'
      );
    }
    const userToUpdate = {
      id: props.user.id,
      password,
      first_name: firstName,
      last_name: lastName,
      email,
      level,
      status
    };
    console.log('updting info', userToUpdate);
    handleClose();

    props.updateUser(userToUpdate);
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
  const statusOptions = [
    {
      key: 1,
      text: 'Käytössä',
      value: 1
    },
    {
      key: 0,
      text: 'Hyllyllä',
      value: null
    }
  ];
  const getStatus = () => {
    console.log('getting display');
    if (status === null) {
      setStatus(1);
    } else {
      setStatus(null);
    }
  };

  return (
    <Modal
      trigger={
        <a href="#!" onClick={handleOpen}>
          {props.user.username}
        </a>
      }
      closeIcon
      open={modalOpen}
      onClose={handleClose}
    >
      <Header content="Muokkaa käyttäjän tietoja" />
      <Modal.Content>
        <Form onSubmit={updateUserClick}>
          <Form.Field>
            <label>Käyttäjätunnus</label>
            <Input
              defaultValue={props.user.username}
              type="text"
              placeholder="Käyttäjätunnus..."
              disabled
            />
          </Form.Field>
          <Form.Field>
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
          <Form.Field>
            <label>Taso</label>
            <Dropdown
              selection
              defaultValue={props.user.level}
              options={levelOptions}
              onChange={getLevel}
            />
          </Form.Field>
          <Form.Field>
            <label>Tunnus käytössä</label>
            <Form.Checkbox
              name="active"
              onChange={getStatus}
              checked={status ? true : false}
            />
          </Form.Field>
          {/* <Form.Field>
            <label>Tila</label>
            <Dropdown
              selection
              defaultValue={props.user.status}
              options={statusOptions}
              onChange={getStatus}
            />
          </Form.Field> */}
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

const connectedEditUserModal = connect(
  null,
  { setNotification }
)(EditUserModal);

export default connectedEditUserModal;

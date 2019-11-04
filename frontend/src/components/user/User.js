import React, { useState } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import ModalNotification from '../layout/ModalNotification';
import { setNotification } from '../../reducers/notificationReducer';
import { updateUser } from '../../actions/userActions';
import {
  Table,
  Modal,
  Header,
  Form,
  Button,
  Input,
  Icon
} from 'semantic-ui-react';
import { setCurrent } from '../../actions/userActions';

const User = props => {
  const [modalOpen, setModalOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState(props.user.first_name);
  const [lastName, setLastName] = useState(props.user.last_name);
  const [email, setEmail] = useState(props.user.email);
  const [level, setLevel] = useState(props.user.level);
  const [status, setStatus] = useState(props.user.status);

  const handleOpen = () => {
    props.setCurrent(props.user);

    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
  };

  const onDelete = () => {
    console.log(`klikd delete on user ${props.user.id}`);
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

  let userLevelOutPrint;
  if (level === 1) {
    userLevelOutPrint = 'DJ';
  } else if (level === 2) {
    userLevelOutPrint = 'Toimitus';
  } else {
    userLevelOutPrint = 'Admin';
  }

  let userStatusOutPrint;
  if (status === null) {
    userStatusOutPrint = 'Hyllyllä';
  } else if (status === 1) {
    userStatusOutPrint = 'Käytössä';
  }

  return (
    <Table.Row>
      <Table.Cell>
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
                  value={props.user.username}
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
                  value={firstName}
                  type="text"
                  placeholder="Etunimi..."
                  onChange={e => setFirstName(e.target.value)}
                />
              </Form.Field>
              <Form.Field>
                <label>Sukunimi</label>
                <Input
                  focus
                  value={lastName}
                  type="text"
                  placeholder="Sukunimi..."
                  onChange={e => setLastName(e.target.value)}
                />
              </Form.Field>
              <Form.Field>
                <label>Email</label>
                <Input
                  focus
                  value={email}
                  type="email"
                  placeholder="Email..."
                  onChange={e => setEmail(e.target.value)}
                />
              </Form.Field>
              <Form.Field
                label="Taso"
                control="select"
                value={level}
                onChange={e => setLevel(e.target.value)}
              >
                <option value="1">DJ</option>
                <option value="2">Toimitus</option>
                <option value="3">Admin</option>
              </Form.Field>
              <Form.Field
                label="Tila"
                control="select"
                value={status}
                onChange={e => setStatus(e.target.value)}
              >
                <option value="1">Käytössä</option>
                <option value={null}>Hyllyllä</option>
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
      </Table.Cell>
      <Table.Cell>
        {props.user.first_name} {props.user.last_name}
      </Table.Cell>
      <Table.Cell>
        <Moment format="MMMM Do YYYY, h:mm:ss a">{props.user.last_seen}</Moment>
      </Table.Cell>
      <Table.Cell>{userStatusOutPrint}</Table.Cell>
      <Table.Cell>{userLevelOutPrint}</Table.Cell>
      <Table.Cell>
        <Icon color="red" onClick={onDelete} name="delete" />
      </Table.Cell>
    </Table.Row>
  );
};

const mapDispatchToProps = {
  setCurrent,
  setNotification,
  updateUser
};

const connectedUser = connect(
  null,
  mapDispatchToProps
)(User);

export default connectedUser;

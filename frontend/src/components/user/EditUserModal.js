import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setCurrent } from '../../actions/userActions';
import { Modal, Header, Form, Button, Input } from 'semantic-ui-react';

const EditUserModal = props => {
  console.log(props);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState(props.current.first_name);
  const [lastName, setLastName] = useState(props.current.last_name);
  const [email, setEmail] = useState(props.current.email);
  const [level, setLevel] = useState(props.current.level);

  useEffect(() => {
    if (props.current) {
      setFirstName(props.current.first_name);
      setLastName(props.current.last_name);
      setEmail(props.current.email);
      setLevel(props.current.level);
    }
  }, [props.current]);

  const onUpdateSubmit = () => {
    console.log(
      'submitted',

      password,
      confirmPassword,
      firstName,
      lastName,
      email,
      level
    );
    // clear fields
    setPassword('');
    setFirstName('');
    setLastName('');
    setEmail('');
    setLevel('');
  };

  return (
    <Modal
      trigger={
        <a href="#!" onClick={() => props.setCurrent(props.user)}>
          {props.user.username}
        </a>
      }
      closeIcon
    >
      <Header content="Muokkaa käyttäjän tietoja" />
      <Modal.Content>
        <Form onSubmit={onUpdateSubmit}>
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
              type="text"
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
          <Button type="submit">Tallenna</Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

const mapStateToProps = state => ({
  current: state.users.current,
  users: state.users.users
});

export default connect(
  mapStateToProps,
  { setCurrent }
)(EditUserModal);

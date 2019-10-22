import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import M from 'materialize-css/dist/js/materialize.min.js';

const EditUserModal = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [level, setLevel] = useState('');

  useEffect(() => {
    if (props.current) {
      setUsername(props.current.username);
      setFirstName(props.current.first_name);
      setLastName(props.current.last_name);
      setEmail(props.current.email);
      setLevel(props.current.level);
    }
  }, [props.current]);

  const onSubmit = () => {
    if (username === '' || password === '') {
      M.toast({ html: 'Tarkasta käyttäjätunnus & salasana' });
    } else {
      console.log(
        'submitted',
        username,
        password,
        firstName,
        lastName,
        email,
        level
      );
      // clear fields
      setUsername('');
      setPassword('');
      setFirstName('');
      setLastName('');
      setEmail('');
      setLevel('');
    }
  };
  return (
    <div id="edit-user-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <h4>Muokkaa käyttäjän tietoja</h4>
        <br />
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <label htmlFor="username" className="active">
              Käyttäjätunnus
            </label>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <input
              type="password"
              name="password"
              value=""
              onChange={e => setPassword(e.target.value)}
            />
            <label htmlFor="password" className="active">
              Salasana - syöta vaihtaaksesi
            </label>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <input
              type="password"
              name="confirmPassword"
              value=""
              onChange={e => setConfirmPassword(e.target.value)}
            />
            <label htmlFor="confirmPassword" className="active">
              Vahvista salasana
            </label>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
            <label htmlFor="firstName" className="active">
              Etunimi
            </label>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
            <label htmlFor="lastName" className="active">
              Sukunimi
            </label>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <input
              type="email"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <label htmlFor="email" className="active">
              Sähköposti
            </label>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <select
              name="level"
              value={level}
              className="browser-default"
              onChange={e => setLevel(e.target.value)}
            >
              <option value="" disabled>
                Taso...
              </option>
              <option value="1">DJ</option>
              <option value="2">Toimitus</option>
              <option value="3">Admin</option>
            </select>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <a
          href="#!"
          onClick={onSubmit}
          className="modal-close waves-effect waves-light black btn"
        >
          Tallenna
        </a>
      </div>
    </div>
  );
};

const modalStyle = {
  width: '75%',
  height: '75%'
};

const mapStateToProps = state => ({
  current: state.users.current
});

export default connect(
  mapStateToProps,
  null
)(EditUserModal);

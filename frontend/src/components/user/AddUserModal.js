import React, { useState } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';

const AddUserModal = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [level, setLevel] = useState('');

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
    <div id="add-user-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <h4>Lisää käyttäjä</h4>
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
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <label htmlFor="password" className="active">
              Salasana
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

export default AddUserModal;

import React from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({ onSubmit, username, password }) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input placeholder="Käyttäjätunnus..." {...username} />
        <input placeholder="Salasana..." {...password} />
        <button type="submit">Kirjaudu</button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired
};

export default LoginForm;

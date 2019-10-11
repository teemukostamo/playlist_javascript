import React, { useState, useEffect } from 'react';
import loginService from './services/login';

import Notification from './components/Notification';

const App = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      // set token to playlistservice
      // playlistService.setToken(user.token);
    }
  }, []);

  const handleLogin = async event => {
    event.preventDefault();
    console.log('logging in with', username, password);
    try {
      const user = await loginService.login({
        username,
        password
      });
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      setUser(user);
      console.log('logged in user', user);

      // set token for user here
      // playlistService.setToken(user.token);

      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('wrong credz');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser');
    setUser(null);
  };

  if (user === null) {
    return (
      <div>
        <h2>Login</h2>
        <Notification message={errorMessage} />
        <form onSubmit={handleLogin}>
          <input
            type="text"
            value={username}
            placeholder="Käyttäjätunnus"
            onChange={({ target }) => setUsername(target.value)}
          />
          <input
            type="password"
            value={password}
            placeholder="Salasana"
            onChange={({ target }) => setPassword(target.value)}
          />
          <button type="submit">Kirjaudu</button>
        </form>{' '}
      </div>
    );
  }
  return (
    <div>
      Logged in as {user.username}
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default App;

import React, { useState, useEffect } from 'react';

import UserList from './components/UserList';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';

import loginService from './services/login';
import userService from './services/users';
import { useField } from './hooks';

const App = () => {
  const [user, setUser] = useState(null);
  const [userList, setUserList] = useState([]);
  const username = useField('text');
  const password = useField('password');

  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    console.log(userService);
    userService.getAll();
    userService.getAll().then(initialUsers => {
      setUserList(initialUsers);
    });
  }, []);

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
        username: username.attributes.value,
        password: password.attributes.value
      });
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      setUser(user);
      console.log('logged in user', user);

      // set token for user here
      // playlistService.setToken(user.token);
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
        <h2>Login to system</h2>
        <Notification message={errorMessage} />
        <LoginForm
          username={username.attributes}
          password={password.attributes}
          onSubmit={handleLogin}
        />
      </div>
    );
  }
  console.log(userList);
  return (
    <div>
      Logged in as {user.username}
      <button onClick={handleLogout}>logout</button>
      <h2>Usernmaes</h2>
      <UserList userList={userList} />
    </div>
  );
};

export default App;

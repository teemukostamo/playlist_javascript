import loginService from '../services/login';
import userService from '../services/users';
import {
  INIT_USER,
  LOGIN,
  LOGOUT,
  LOGIN_ERROR,
  SET_LOADING
} from '../actions/types';

export const initializeUser = () => async dispatch => {
  try {
    setLoading();
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      // set token for logged in user
      userService.setToken(user.token);
      dispatch({
        type: INIT_USER,
        data: user
      });
    }
  } catch (err) {
    dispatch({
      type: LOGIN_ERROR,
      payload: err.response.statusText
    });
  }
};

export const newLogin = (user, errorNotification) => async dispatch => {
  try {
    setLoading();
    const newUser = await loginService.login(user);
    window.localStorage.setItem('loggedUser', JSON.stringify(newUser));
    // set token for logged in user
    // blogService.setToken(newUser.token);
    dispatch({
      type: LOGIN,
      data: newUser
    });
  } catch (exception) {
    errorNotification(`väärä käyttäjätunnus tai salasana`, 4);
  }
};

export const logout = () => async dispatch => {
  window.localStorage.removeItem('loggedUser');
  dispatch({
    type: LOGOUT
  });
};

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};

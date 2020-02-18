import loginService from '../services/login';
import artistService from '../services/artists';
import albumService from '../services/albums';
import programService from '../services/programs';
import reportService from '../services/reports';
import searchService from '../services/search';
import trackService from '../services/tracks';
import userService from '../services/users';
import {
  INIT_USER,
  LOGIN,
  LOGOUT,
  LOGIN_ERROR,
  UPDATE_CURRENT_USER,
  SET_LOADING
} from './types';

export const initializeUser = () => async dispatch => {
  try {
    dispatch({
      type: SET_LOADING
    });
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      // set token for logged in user
      userService.setToken(user.token);
      reportService.setToken(user.token);
      programService.setToken(user.token);
      searchService.setToken(user.token);
      trackService.setToken(user.token);
      artistService.setToken(user.token);
      albumService.setToken(user.token);
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

export const newLogin = user => async dispatch => {
  try {
    dispatch({
      type: SET_LOADING
    });
    const newUser = await loginService.login(user);
    window.localStorage.setItem('loggedUser', JSON.stringify(newUser));
    // set token for logged in user
    // blogService.setToken(newUser.token);
    dispatch({
      type: LOGIN,
      data: newUser,
      loading: false
    });
  } catch (exception) {
    const content = {
      message: 'wrong username or password',
      type: 'fail'
    };
    dispatch({
      type: 'SET_NOTIFICATION',
      data: content
    });
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      });
    }, 3000);
  }
};

export const updateCurrentUser = userToUpdate => async dispatch => {
  try {
    dispatch({
      type: UPDATE_CURRENT_USER,
      data: userToUpdate
    });
  } catch (error) {
    console.log(error);
  }
};

export const logout = () => async dispatch => {
  window.localStorage.removeItem('loggedUser');
  dispatch({
    type: LOGOUT
  });
  dispatch({});
};

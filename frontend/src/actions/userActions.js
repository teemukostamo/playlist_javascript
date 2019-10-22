import {
  INIT_USERS_LIST,
  USER_ERROR,
  SET_LOADING,
  SET_CURRENT
} from '../actions/types';
import userService from '../services/users';

export const initializeUsers = () => async dispatch => {
  try {
    setLoading();
    const users = await userService.getAll();
    dispatch({
      type: INIT_USERS_LIST,
      data: users
    });
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: err
    });
  }
};

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};

// Set current user for editing
export const setCurrent = user => {
  return {
    type: SET_CURRENT,
    payload: user
  };
};

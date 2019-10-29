import {
  INIT_USERS_LIST,
  USER_ERROR,
  SET_LOADING,
  SET_CURRENT
} from '../actions/types';
import userService from '../services/users';

export const initializeUsers = () => async dispatch => {
  try {
    dispatch({
      type: SET_LOADING
    });
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

// Set current user for editing
export const setCurrent = user => {
  return {
    type: SET_CURRENT,
    payload: user
  };
};

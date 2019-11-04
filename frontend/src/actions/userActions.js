import {
  INIT_USERS_LIST,
  SET_LOADING,
  SET_CURRENT,
  UPDATE_USER
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
    console.log(err);
  }
};

// Set current user for editing
export const setCurrent = user => {
  return {
    type: SET_CURRENT,
    payload: user
  };
};

export const updateUser = userToUpdate => async dispatch => {
  try {
    dispatch({
      type: SET_LOADING
    });
    const updated = await userService.updateUser(userToUpdate);
    const users = await userService.getAll();
    console.log(updated);
    dispatch({
      type: UPDATE_USER,
      data: users
    });
  } catch (error) {
    console.log(error);
  }
};

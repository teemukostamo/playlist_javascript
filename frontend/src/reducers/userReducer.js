import {
  INIT_USERS_LIST,
  SET_LOADING,
  SET_CURRENT,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER
} from '../actions/types';

const initialState = {
  users: null,
  current: null,
  loading: false
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_USERS_LIST:
      return {
        ...state,
        users: action.data,
        loading: false
      };

    case SET_LOADING:
      return {
        ...state,
        loading: false
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
        loading: false
      };
    case CREATE_USER:
      return {
        ...state,
        users: [...state.users, action.data],
        loading: false
      };
    case UPDATE_USER:
      return {
        ...state,
        users: action.data,
        loading: false
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.data),
        loading: false
      };
    default:
      return state;
  }
};

export default userReducer;

import {
  INIT_USER,
  LOGIN,
  LOGOUT,
  LOGIN_ERROR,
  UPDATE_CURRENT_USER,
  SET_LOADING
} from '../actions/types';

const initialState = {
  user: null,
  loading: false,
  error: null
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_USER:
      return action.data;

    case LOGOUT:
      return initialState;

    case LOGIN:
      return action.data;

    case LOGIN_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case UPDATE_CURRENT_USER:
      return {
        ...state,
        first_name: action.data.first_name,
        last_name: action.data.last_name,
        email: action.data.email
      };

    case SET_LOADING:
      return {
        ...state,
        loading: true
      };

    default:
      return state;
  }
};

export default loginReducer;

import {
  INIT_USER,
  LOGIN,
  LOGOUT,
  LOGIN_ERROR,
  SET_LOADING
} from '../actions/types';

const initialState = {
  user: null,
  loading: false,
  error: null
};

const loginReducer = (state = initialState, action) => {
  // console.log('loginreducer state', state);
  // console.log('loginreducer action', action);

  switch (action.type) {
    case INIT_USER:
      return action.data;

    case LOGOUT:
      return initialState;

    case LOGIN:
      return action.data;

    case LOGIN_ERROR:
      console.error(action.payload);
      return {
        ...state,
        error: action.payload
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

import {
  INIT_USERS_LIST,
  SET_LOADING,
  SET_CURRENT,
  USER_ERROR
} from '../actions/types';

const initialState = {
  users: null,
  current: null,
  loading: false,
  error: null
};
const userReducer = (state = initialState, action) => {
  // console.log('userreducer state now: ', state);
  // console.log('userreducer action', action.data);

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
        current: action.payload
      };
    case USER_ERROR:
      console.error(action.payload);
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;

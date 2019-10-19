import { INIT_USERS_LIST, SET_LOADING, USER_ERROR } from '../actions/types';

const initialState = [
  {
    users: null,
    loading: false,
    error: null
  }
];

const userReducer = (state = [], action) => {
  // console.log('userreducer state now: ', state);
  // console.log('userreducer action', action.data);

  switch (action.type) {
    case INIT_USERS_LIST:
      return action.data;

    case SET_LOADING:
      return {
        ...state,
        loading: true
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

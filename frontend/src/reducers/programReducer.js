import { GET_ONE_PROGRAM, GET_ALL_PROGRAMS } from '../actions/types';

const initialState = {
  allPrograms: null,
  program: null,
  loading: false
};

const programReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PROGRAMS:
      return {
        ...state,
        allPrograms: action.data,
        loading: false
      };
    case GET_ONE_PROGRAM:
      return {
        ...state,
        program: action.data,
        loading: false
      };
    default:
      return state;
  }
};

export default programReducer;

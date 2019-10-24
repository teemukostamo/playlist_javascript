import {
  GET_ALL_REPORTS_BY_DATE,
  SET_LOADING,
  REPORT_ERROR
} from '../actions/types';

const initialState = {
  reportsList: null,
  loading: false,
  error: null
};

const reportListReducer = (state = initialState, action) => {
  console.log('report list reducer state now: ', state);
  console.log('report list reducer action', action);
  console.log(action.type);

  switch (action.type) {
    // date is YYYY-MM
    case GET_ALL_REPORTS_BY_DATE:
      return {
        reportsList: action.data,
        loading: true
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case REPORT_ERROR:
      console.error(action.payload);
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default reportListReducer;

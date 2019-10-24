import {
  GET_ONE_REPORT,
  GET_REPORT_DETAILS,
  SET_LOADING,
  REPORT_ERROR
} from '../actions/types';

const initialState = {
  report: null,
  reportDetails: null,
  loading: false,
  error: null
};

const reportReducer = (state = initialState, action) => {
  console.log('reportreducer state now: ', state);
  console.log('reportreducer action', action);
  console.log(action.type);

  switch (action.type) {
    case GET_ONE_REPORT:
      return {
        ...state,
        report: action.data,
        loading: false
      };
    case GET_REPORT_DETAILS:
      return {
        ...state,
        reportDetails: action.data,
        loading: false
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

export default reportReducer;

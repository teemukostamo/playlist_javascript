import {
  GET_ONE_REPORT,
  GET_REPORT_DETAILS,
  GET_DJONLINE_TRACKS,
  CREATE_REPORT,
  UPDATE_REPORT,
  SET_LOADING,
  REPORT_ERROR
} from '../actions/types';

const initialState = {
  report: null,
  reportDetails: null,
  newReport: null,
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
    case GET_DJONLINE_TRACKS:
      return {
        ...state,
        report: [...state.report, action.data],
        loading: false
      };
    case GET_REPORT_DETAILS:
      return {
        ...state,
        reportDetails: action.data,
        newReport: null,
        loading: false
      };
    case CREATE_REPORT: {
      return {
        ...state,
        newReport: action.data,
        loading: false
      };
    }
    case UPDATE_REPORT:
      return {
        ...state,
        reportDetails: action.data,
        newReport: null,
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

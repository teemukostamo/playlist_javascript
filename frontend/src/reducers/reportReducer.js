import {
  GET_ONE_REPORT,
  GET_REPORT_DETAILS,
  SET_LOADING
} from '../actions/types';

const initialState = {
  report: null,
  reportDetails: null,
  loading: false
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

    default:
      return state;
  }
};

export default reportReducer;

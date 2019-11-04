import {
  GET_ALL_REPORTS_BY_DATE,
  GET_ALL_REPORT_TRANSFERS,
  GENERATE_REPORT_TRANSFER,
  SORT_BY_USER_ID,
  SET_LOADING,
  REPORT_ERROR
} from '../actions/types';

const initialState = {
  reportsList: null,
  reportTransferList: null,
  lastTransfer: null,
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
        ...state,
        reportsList: action.data,
        loading: false
      };
    case GET_ALL_REPORT_TRANSFERS:
      return {
        ...state,
        reportTransferList: action.data,
        loading: false
      };
    case GENERATE_REPORT_TRANSFER:
      return {
        ...state,
        lastTransfer: action.data,
        loading: false
      };
    case SORT_BY_USER_ID:
      console.log('action id', action.data);
      console.log(state.reportsList);
      return {
        ...state,
        reportsList: state.reportsList.filter(r => r.user_id !== action.data)
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

import {
  GET_ALL_REPORTS_BY_DATE,
  GET_ALL_IN_PROGRESS,
  GET_ALL_REPORT_TRANSFERS,
  GENERATE_REPORT_TRANSFER,
  FILTER_BY_USER_ID,
  FILTER_BY_STATUS,
  FILTER_BY_TEXT,
  DELETE_REPORT,
  SET_LOADING,
  REPORT_ERROR
} from '../actions/types';

const initialState = {
  inProgress: null,
  reportsList: null,
  reportListDate: null,
  reportTransferList: null,
  lastTransfer: null,
  loading: false,
  filterStatusValue: null,
  filterUserValue: null,
  filterByText: '',
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
        reportListDate: action.date,
        loading: false
      };
    case GET_ALL_IN_PROGRESS:
      return {
        ...state,
        inProgress: action.data,
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
    case DELETE_REPORT:
      return {
        ...state,
        reportsList: state.reportsList.filter(
          report => report.id !== action.data
        ),
        loading: false
      };
    case FILTER_BY_USER_ID:
      console.log('action id', action.data);
      console.log('report list reducer state after FILTER by id action', state);
      return {
        ...state,
        filterUserValue: action.data
      };
    case FILTER_BY_STATUS:
      console.log('action id', action.data);
      console.log('report list reducer state after FILTER by id action', state);
      return {
        ...state,
        filterStatusValue: action.data
      };
    case FILTER_BY_TEXT:
      return {
        ...state,
        // reportsToShow:
        //   action.data.length === 0
        //     ? state.reportsList
        //     : state.reportsList.filter(r =>
        //         r.name.toLowerCase().includes(action.data.toLowerCase())
        //       ),

        filterByText: action.data
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

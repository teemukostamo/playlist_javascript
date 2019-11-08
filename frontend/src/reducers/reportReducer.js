import {
  GET_ONE_REPORT,
  GET_REPORT_DETAILS,
  GET_DJONLINE_TRACKS,
  ADD_NEW_TRACK,
  UPDATE_TRACK,
  SET_EDIT_TRACK_ID,
  GET_ONE_TRACK,
  REMOVE_CURRENT_TRACK,
  DELETE_TRACK_FROM_REPORT,
  CHECK_FOR_DELETE,
  UNCHECK_FOR_DELETE,
  CREATE_REPORT,
  UPDATE_REPORT,
  CLEAR_CURRENT_REPORT,
  SET_LOADING,
  REPORT_ERROR
} from '../actions/types';

const initialState = {
  report: [],
  djonline: null,
  editTrackId: null,
  reportDetails: null,
  newReport: null,
  loading: false,
  checkedForDelete: [],
  currentTrack: null,
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
        report: [...state.report, action.data.map(track => track)],
        djonline: action.data,
        loading: false
      };
    case ADD_NEW_TRACK:
      return {
        ...state,
        report: [...state.report, action.data],
        loading: false
      };
    case UPDATE_TRACK:
      return {
        ...state,
        report: state.report.map(track =>
          track.track_id === action.data.track_id ? action.data : track
        ),
        loading: false
      };
    case SET_EDIT_TRACK_ID:
      return {
        ...state,
        editTrackId: action.data
      };
    case GET_ONE_TRACK:
      return {
        ...state,
        currentTrack: action.data,
        loading: false
      };
    case REMOVE_CURRENT_TRACK:
      return {
        ...state,
        currentTrack: null
      };
    case GET_REPORT_DETAILS:
      return {
        ...state,
        reportDetails: action.data,
        newReport: null
        // loading: false
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

    case DELETE_TRACK_FROM_REPORT:
      return {
        ...state,
        report: state.report.filter(
          track => track.report_track_id !== action.id
        )
      };
    case CHECK_FOR_DELETE:
      return {
        ...state,
        checkedForDelete: [action.data, ...state.checkedForDelete]
      };
    case UNCHECK_FOR_DELETE:
      console.log(action.data);
      console.log(typeof state.checkedForDelete);
      console.log(state.checkedForDelete);
      return {
        ...state,
        checkedForDelete: state.checkedForDelete.filter(
          id => id !== action.data
        )
      };
    case CLEAR_CURRENT_REPORT:
      return {
        ...state,
        report: []
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

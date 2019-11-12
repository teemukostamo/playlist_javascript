import {
  GET_ONE_TRACK,
  GET_ONE_TRACK_HISTORY,
  CLEAR_CURRENT_TRACK,
  SET_LOADING
} from '../actions/types';

const initialState = {
  currentTrack: null,
  playhistory: null,
  loading: false
};

const trackReducer = (state = initialState, action) => {
  console.log('trackreducer state now: ', state);
  console.log('trackreducer action', action);

  switch (action.type) {
    case GET_ONE_TRACK:
      return {
        ...state,
        currentTrack: action.data,
        loading: false
      };
    case GET_ONE_TRACK_HISTORY:
      return {
        ...state,
        playhistory: action.data,
        loading: false
      };
    case CLEAR_CURRENT_TRACK:
      return {
        ...state,
        playhistory: null,
        currentTrack: null
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

export default trackReducer;

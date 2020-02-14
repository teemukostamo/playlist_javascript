import {
  GET_ONE_TRACK,
  GET_ONE_TRACK_HISTORY,
  CLEAR_CURRENT_TRACK,
  SET_LOADING,
  CHANGE_ALBUM,
  CHANGE_ARTIST
} from '../actions/types';

const initialState = {
  currentTrack: null,
  playhistory: null,
  loading: false
};

const trackReducer = (state = initialState, action) => {
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
    case CHANGE_ALBUM:
      return {
        ...state,
        currentTrack: [
          {
            ...state.currentTrack[0],
            album_id: action.data.album_id,
            album: action.data.album_name
          }
        ],
        loading: false
      };
    case CHANGE_ARTIST:
      return {
        ...state,
        currentTrack: [
          {
            ...state.currentTrack[0],
            artist_id: action.data.artist_id,
            artist: action.data.artist_name
          }
        ],
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

export default trackReducer;

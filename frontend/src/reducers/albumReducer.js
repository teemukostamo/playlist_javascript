import {
  GET_ONE_ALBUM,
  ADD_TRACK_TO_ALBUM,
  GET_TRACKLIST_OF_ALBUM,
  CLEAR_CURRENT_ALBUM,
  SET_LOADING,
  CHANGE_ARTIST_OF_ALBUM
} from '../actions/types';

const initialState = {
  currentAlbum: null,
  tracklist: null,
  loading: false
};

const albumReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ONE_ALBUM:
      return {
        ...state,
        currentAlbum: action.data,
        loading: false
      };
    case GET_TRACKLIST_OF_ALBUM:
      return {
        ...state,
        tracklist: action.data,
        loading: false
      };
    case CLEAR_CURRENT_ALBUM:
      return {
        ...state,
        currentAlbum: null,
        tracklist: null,
        loading: false
      };
    case ADD_TRACK_TO_ALBUM:
      return {
        ...state,
        tracklist: [...state.tracklist, action.data]
      };
    case CHANGE_ARTIST_OF_ALBUM:
      return {
        ...state,
        currentAlbum: [
          {
            ...state.currentAlbum[0],
            artist_id: action.data.artist_id,
            artist_name: action.data.artist_name
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

export default albumReducer;

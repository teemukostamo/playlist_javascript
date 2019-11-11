import {
  GET_ONE_ALBUM,
  GET_TRACKLIST_OF_ALBUM,
  CLEAR_CURRENT_ALBUM,
  SET_LOADING
} from '../actions/types';

const initialState = {
  currentAlbum: null,
  tracklist: null,
  loading: false
};

const albumReducer = (state = initialState, action) => {
  console.log('albumReducer state now: ', state);
  console.log('albumReducer action', action);

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

import {
  AUTOCOMPLETE_RESULTS,
  ADVANCED_RESULTS,
  SORT_ADVANCED_RESULTS,
  GET_DISCOGS_CATID,
  CLEAR_DISCOGS_CATID,
  TOP_100,
  SET_SEARCH_LOADING,
  GET_CHANGE_ALBUM_OPTIONS,
  GET_CHANGE_ARTIST_OPTIONS,
  RESET_CHANGE_ALBUM_OPTIONS,
  RESET_CHANGE_ARTIST_OPTIONS,
  MERGE_ALBUMS
} from '../actions/types';

const initialState = {
  searchResults: [],
  top100: null,
  top100Query: null,
  advancedResults: null,
  sortAdvancedResults: null,
  changeArtistOptions: null,
  changeAlbumOptions: null,
  loading: false,
  discogsCatId: null,
  error: null
};

const searchReducer = (state = initialState, action) => {
  console.log('searchReducer state now: ', state);
  console.log('searchReducer action', action);
  console.log('searchReducer action.type', action.type);

  switch (action.type) {
    case AUTOCOMPLETE_RESULTS:
      return {
        ...state,
        searchResults: action.data,
        loading: false
      };
    case ADVANCED_RESULTS:
      return {
        ...state,
        advancedResults: action.data,
        loading: false
      };
    case SORT_ADVANCED_RESULTS:
      return {
        ...state,
        sortAdvancedResults: action.data
      };
    case SET_SEARCH_LOADING:
      return {
        ...state,
        loading: true
      };
    case TOP_100:
      return {
        ...state,
        top100: action.data,
        top100Query: action.query,
        loading: false
      };
    case GET_DISCOGS_CATID:
      return {
        ...state,
        discogsCatId: action.data
      };
    case CLEAR_DISCOGS_CATID:
      return {
        ...state,
        discogsCatId: null
      };
    case GET_CHANGE_ALBUM_OPTIONS:
      return {
        ...state,
        changeAlbumOptions: action.data,
        loading: false
      };
    case GET_CHANGE_ARTIST_OPTIONS:
      return {
        ...state,
        changeArtistOptions: action.data,
        loading: false
      };
    case RESET_CHANGE_ALBUM_OPTIONS:
      return {
        ...state,
        changeAlbumOptions: null
      };
    case RESET_CHANGE_ARTIST_OPTIONS:
      return {
        ...state,
        changeArtistOptions: null
      };
    // case MERGE_ALBUMS:
    //   return {
    //     ...state,
    //     advancedResults: state.advancedResults.map(result => result.album_id === action.data.merge)
    //   }
    default:
      return state;
  }
};

export default searchReducer;

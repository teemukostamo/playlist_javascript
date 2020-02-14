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
  MERGE_ALBUMS,
  MERGE_ARTISTS,
  MERGE_TRACKS
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
    case MERGE_TRACKS:
      return {
        ...state,
        advancedResults: state.advancedResults.filter(
          result => result.track_id !== action.data.merge
        )
      };
    case MERGE_ALBUMS: {
      const albumToMerge = action.data.merge;
      const mergeAlbumTo = action.data.mergeTo;
      const newAlbumName = action.data.newName;
      // get the albums that need name and id changing
      const filteredAlbums = state.advancedResults.filter(
        r => r.album_id === albumToMerge
      );
      // update the names and ids of those albums
      const renamedAlbums = filteredAlbums.map(result => ({
        ...result,
        album_id: mergeAlbumTo,
        album_name: newAlbumName
      }));
      // remove albums with old ids from advancedResults
      const removeMergedAlbums = state.advancedResults.filter(
        r => r.album_id !== albumToMerge
      );
      //
      const newAlbumResults = [...renamedAlbums, ...removeMergedAlbums];
      return {
        ...state,
        advancedResults: newAlbumResults
      };
    }
    case MERGE_ARTISTS: {
      const artistToMerge = action.data.merge;
      const mergeArtistTo = action.data.mergeTo;
      const newArtistName = action.data.newName;
      // get the artists that need name and id changing
      const filteredArtists = state.advancedResults.filter(
        r => r.artist_id === artistToMerge
      );
      // update the names and ids of those artists
      const renamedArtists = filteredArtists.map(result => ({
        ...result,
        artist_id: mergeArtistTo,
        artist_name: newArtistName
      }));
      // remove albums with old ids from advancedResults
      const removeMergedArtists = state.advancedResults.filter(
        r => r.artist_id !== artistToMerge
      );
      //
      const newArtistResults = [...renamedArtists, ...removeMergedArtists];
      return {
        ...state,
        advancedResults: newArtistResults
      };
    }
    default:
      return state;
  }
};

export default searchReducer;

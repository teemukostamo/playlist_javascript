import {
  AUTOCOMPLETE_RESULTS,
  SET_SEARCH_LOADING,
  TOP_100,
  GET_DISCOGS_DATA,
  CLEAR_DISCOGS_DATA,
  ADVANCED_RESULTS,
  SORT_ADVANCED_RESULTS,
  GET_CHANGE_ALBUM_OPTIONS,
  GET_CHANGE_ARTIST_OPTIONS,
  RESET_CHANGE_ARTIST_OPTIONS,
  RESET_CHANGE_ALBUM_OPTIONS
} from './types';
import searchService from '../services/search';

export const getAutocompleteResults = query => async dispatch => {
  try {
    dispatch({
      type: SET_SEARCH_LOADING
    });
    const results = await searchService.getTracksForSearch(query);
    dispatch({
      type: AUTOCOMPLETE_RESULTS,
      data: results
    });
  } catch (error) {
    console.log(error);
  }
};

export const advancedSearch = searchParams => async dispatch => {
  try {
    dispatch({
      type: SET_SEARCH_LOADING
    });
    const results = await searchService.advancedSearch(searchParams);
    dispatch({
      type: ADVANCED_RESULTS,
      data: results
    });
  } catch (error) {
    console.log(error);
  }
};

export const sortAdvancedResults = sortBy => async dispatch => {
  try {
    dispatch({
      type: SORT_ADVANCED_RESULTS,
      data: sortBy
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCatIdFromDiscogs = query => async dispatch => {
  try {
    let catId;
    const results = await searchService.getCatIdFromDiscogs(query);

    console.log(results.results.length);
    if (results.results.length === 0) {
      catId = 'EI ILMOITETTU';
    } else if (results.results[0].catno !== 'none') {
      console.log(results.results[0]);

      catId = results.results[0].catno;
    } else if (results.results[1].catno !== 'none') {
      console.log(results.results[1]);

      catId = results.results[1].catno;
    } else if (results.results[2].catno !== 'none') {
      console.log(results.results[2]);

      catId = results.results[2].catno;
    } else if (results.results[3].catno !== 'none') {
      console.log(results.results[3]);

      catId = results.results[3].catno;
    } else if (results.results[4].catno !== 'none') {
      console.log(results.results[4]);

      catId = results.results[4].catno;
    } else {
      catId = 'EI ILMOITETTU';
    }
    console.log(catId);
    dispatch({
      type: GET_DISCOGS_DATA,
      data: catId
    });
  } catch (error) {
    console.log(error);
  }
};

export const clearDiscogsCatId = () => async dispatch => {
  try {
    dispatch({
      type: CLEAR_DISCOGS_DATA
    });
  } catch (error) {
    console.log(error);
  }
};

export const getTop100 = query => async dispatch => {
  try {
    dispatch({
      type: SET_SEARCH_LOADING
    });
    const results = await searchService.getTop100(query);
    dispatch({
      type: TOP_100,
      data: results,
      query
    });
  } catch (error) {
    console.log(error);
  }
};

export const getChangeAlbumOptions = query => async dispatch => {
  try {
    dispatch({
      type: RESET_CHANGE_ALBUM_OPTIONS
    });
    dispatch({
      type: SET_SEARCH_LOADING
    });
    const results = await searchService.changeAlbumOptions(query);
    dispatch({
      type: GET_CHANGE_ALBUM_OPTIONS,
      data: results
    });
  } catch (error) {
    console.log(error);
  }
};

export const getChangeArtistOptions = query => async dispatch => {
  try {
    dispatch({
      type: RESET_CHANGE_ARTIST_OPTIONS
    });
    dispatch({
      type: SET_SEARCH_LOADING
    });
    const results = await searchService.changeArtistOptions(query);
    dispatch({
      type: GET_CHANGE_ARTIST_OPTIONS,
      data: results
    });
  } catch (error) {
    console.log(error);
  }
};

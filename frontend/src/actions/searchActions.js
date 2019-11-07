import {
  AUTOCOMPLETE_RESULTS,
  SET_SEARCH_LOADING,
  GET_DISCOGS_CATID,
  CLEAR_DISCOGS_CATID
} from './types';
import searchService from '../services/search';

export const getAutocompleteResults = query => async dispatch => {
  try {
    dispatch({
      type: SET_SEARCH_LOADING
    });
    const results = await searchService.getTracksForSearch(query);
    console.log(results);
    dispatch({
      type: AUTOCOMPLETE_RESULTS,
      data: results
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCatIdFromDiscogs = query => async dispatch => {
  try {
    let catId;
    const results = await searchService.getCatIdFromDiscogs(query);
    console.log(results.results);
    if (results.results === undefined) {
      catId = 'EI ILMOITETTU';
    } else if (results.results[0].catno !== 'none') {
      catId = results.results[0].catno;
    } else if (results.results[1].catno !== 'none') {
      catId = results.results[1].catno;
    } else if (results.results[2].catno !== 'none') {
      catId = results.results[2].catno;
    } else if (results.results[3].catno !== 'none') {
      catId = results.results[3].catno;
    } else if (results.results[4].catno !== 'none') {
      catId = results.results[4].catno;
    } else {
      catId = 'EI ILMOITETTU';
    }
    console.log(catId);
    dispatch({
      type: GET_DISCOGS_CATID,
      data: catId
    });
  } catch (error) {
    console.log(error);
  }
};

export const clearDiscogsCatId = () => async dispatch => {
  try {
    dispatch({
      type: CLEAR_DISCOGS_CATID
    });
  } catch (error) {
    console.log(error);
  }
};

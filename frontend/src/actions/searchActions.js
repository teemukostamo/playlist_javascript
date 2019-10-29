import { AUTOCOMPLETE_RESULTS, SET_LOADING } from './types';
import searchService from '../services/search';

export const getAutocompleteResults = query => async dispatch => {
  try {
    dispatch({
      type: SET_LOADING
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

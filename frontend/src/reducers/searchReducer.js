import { AUTOCOMPLETE_RESULTS, SET_LOADING } from '../actions/types';

const initialState = {
  searchResults: [],
  trackResults: null,
  artistResults: null,
  albumResults: null,
  loading: false,
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
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};

export default searchReducer;

import { GET_ONE_ARTIST, SET_LOADING } from '../actions/types';

const initialState = {
  currentArtist: null,
  loading: false
};

const artistReducer = (state = initialState, action) => {
  console.log('artistreducer state now: ', state);
  console.log('artistreducer action', action);

  switch (action.type) {
    case GET_ONE_ARTIST:
      return {
        ...state,
        currentArtist: action.data,
        loading: false
      };
    default:
      return state;
  }
};

export default artistReducer;

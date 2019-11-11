import { GET_ONE_ARTIST, SET_LOADING } from './types';
import artistService from '../services/artists';

export const getOneArtist = id => async dispatch => {
  try {
    dispatch({
      type: SET_LOADING
    });
    const artist = await artistService.getOneArtist(id);
    dispatch({
      type: GET_ONE_ARTIST,
      data: artist
    });
  } catch (error) {
    console.log(error);
  }
};

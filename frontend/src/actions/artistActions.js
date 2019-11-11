import {
  GET_ONE_ARTIST,
  SET_LOADING,
  GET_ALBUM_LIST_BY_ARTIST,
  CLEAR_CURRENT_ARTIST
} from './types';
import artistService from '../services/artists';

export const getOneArtist = id => async dispatch => {
  try {
    dispatch({
      type: CLEAR_CURRENT_ARTIST
    });
    dispatch({
      type: SET_LOADING
    });
    const artist = await artistService.getOneArtist(id);
    dispatch({
      type: GET_ONE_ARTIST,
      data: artist
    });
    const albumList = await artistService.getAlbumsByArtist(id);
    dispatch({
      type: GET_ALBUM_LIST_BY_ARTIST,
      data: albumList
    });
  } catch (error) {
    console.log(error);
  }
};

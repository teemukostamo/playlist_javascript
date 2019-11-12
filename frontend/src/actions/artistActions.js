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

export const updateArtist = artistToUpdate => async dispatch => {
  dispatch({
    type: SET_LOADING
  });
  console.log('artist to update', artistToUpdate);
  const updateArtist = await artistService.updateArtist(artistToUpdate);
  console.log(updateArtist);
  const updatedArtist = await artistService.getOneArtist(artistToUpdate.id);
  dispatch({
    type: GET_ONE_ARTIST,
    data: updatedArtist
  });
};

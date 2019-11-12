import {
  GET_ONE_ALBUM,
  GET_TRACKLIST_OF_ALBUM,
  CLEAR_CURRENT_ALBUM,
  SET_LOADING
} from './types';
import albumService from '../services/albums';

export const getOneAlbum = id => async dispatch => {
  try {
    dispatch({
      type: CLEAR_CURRENT_ALBUM
    });
    dispatch({
      type: SET_LOADING
    });
    const album = await albumService.getOneAlbum(id);
    dispatch({
      type: GET_ONE_ALBUM,
      data: album
    });
    const tracklist = await albumService.getTracklistOfAlbum(id);
    dispatch({
      type: GET_TRACKLIST_OF_ALBUM,
      data: tracklist
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateAlbum = albumToUpdate => async dispatch => {
  dispatch({
    type: SET_LOADING
  });
  console.log('artist to update', albumToUpdate);
  const updateAlbum = await albumService.updateAlbum(albumToUpdate);
  console.log(updateAlbum);
  const updatedAlbum = await albumService.getOneAlbum(albumToUpdate.id);
  dispatch({
    type: GET_ONE_ALBUM,
    data: updatedAlbum
  });
};

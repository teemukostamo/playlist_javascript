import {
  GET_ONE_ALBUM,
  GET_TRACKLIST_OF_ALBUM,
  CLEAR_CURRENT_ALBUM,
  MERGE_ALBUMS,
  CHANGE_ARTIST_OF_ALBUM,
  SET_LOADING
} from './types';
import albumService from '../services/albums';
import searchService from '../services/search';

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
  await albumService.updateAlbum(albumToUpdate);
  const updatedAlbum = await albumService.getOneAlbum(albumToUpdate.id);
  dispatch({
    type: GET_ONE_ALBUM,
    data: updatedAlbum
  });
};

export const mergeAlbumFunction = mergeParams => async dispatch => {
  try {
    dispatch({
      type: SET_LOADING
    });
    await searchService.merge(mergeParams);
    const album = await albumService.getOneAlbum(mergeParams.mergeTo);
    dispatch({
      type: GET_ONE_ALBUM,
      data: album
    });
    const tracklist = await albumService.getTracklistOfAlbum(
      mergeParams.mergeTo
    );
    dispatch({
      type: GET_TRACKLIST_OF_ALBUM,
      data: tracklist
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateAlbumState = mergeParams => async dispatch => {
  dispatch({
    type: MERGE_ALBUMS,
    data: mergeParams
  });
};

export const updateArtistId = artistToUpdate => async dispatch => {
  try {
    dispatch({
      type: SET_LOADING
    });
    await albumService.changeArtistId(artistToUpdate);
    dispatch({
      type: CHANGE_ARTIST_OF_ALBUM,
      data: artistToUpdate
    });
  } catch (error) {
    console.log(error);
  }
};

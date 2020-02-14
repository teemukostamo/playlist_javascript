import {
  GET_ONE_ARTIST,
  SET_LOADING,
  GET_ALBUM_LIST_BY_ARTIST,
  CLEAR_CURRENT_ARTIST,
  MERGE_ARTISTS
} from './types';
import artistService from '../services/artists';
import searchService from '../services/search';

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
  await artistService.updateArtist(artistToUpdate);
  const updatedArtist = await artistService.getOneArtist(artistToUpdate.id);
  dispatch({
    type: GET_ONE_ARTIST,
    data: updatedArtist
  });
};

export const mergeArtistFunction = mergeParams => async dispatch => {
  try {
    dispatch({
      type: SET_LOADING
    });
    await searchService.merge(mergeParams);
    const artist = await artistService.getOneArtist(mergeParams.mergeTo);
    dispatch({
      type: GET_ONE_ARTIST,
      data: artist
    });
    const albumList = await artistService.getAlbumsByArtist(
      mergeParams.mergeTo
    );
    dispatch({
      type: GET_ALBUM_LIST_BY_ARTIST,
      data: albumList
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateArtistState = mergeParams => async dispatch => {
  dispatch({
    type: MERGE_ARTISTS,
    data: mergeParams
  });
};

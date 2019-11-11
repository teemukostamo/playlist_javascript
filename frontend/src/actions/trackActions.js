import {
  GET_DJONLINE_TRACKS,
  ADD_NEW_TRACK,
  UPDATE_TRACK,
  SET_LOADING,
  GET_ONE_TRACK,
  REMOVE_CURRENT_TRACK
} from './types';
import trackService from '../services/tracks';

export const getDjonlineTracks = searchParams => async dispatch => {
  try {
    dispatch({
      type: SET_LOADING
    });
    const tracks = await trackService.checkDjonlineTracks(searchParams);
    dispatch({
      type: GET_DJONLINE_TRACKS,
      data: tracks
    });
  } catch (error) {
    console.log(error);
  }
};

export const addNewTrack = trackToAdd => async dispatch => {
  try {
    dispatch({
      type: SET_LOADING
    });
    const track = await trackService.addNewTrack(trackToAdd);
    console.log(track);
    dispatch({
      type: ADD_NEW_TRACK,
      data: track
    });
  } catch (error) {
    console.log(error);
  }
};
export const updateTrack = trackToUpdate => async dispatch => {
  try {
    dispatch({
      type: SET_LOADING
    });
    const updatedTrack = await trackService.updateTrack(trackToUpdate);
    console.log('updated track', updatedTrack);
    dispatch({
      type: UPDATE_TRACK,
      data: updatedTrack
    });
  } catch (error) {
    console.log(error);
  }
};

export const getOneTrack = id => async dispatch => {
  try {
    // dispatch({
    //   type: SET_LOADING
    // });
    const track = await trackService.getOneTrack(id);
    dispatch({
      type: GET_ONE_TRACK,
      data: track
    });
  } catch (error) {
    console.log(error);
  }
};

export const removeCurrentTrack = () => async dispatch => {
  dispatch({
    type: REMOVE_CURRENT_TRACK
  });
};

import { GET_DJONLINE_TRACKS, ADD_NEW_TRACK, SET_LOADING } from './types';
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

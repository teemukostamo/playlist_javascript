import { GET_DJONLINE_TRACKS, SET_LOADING } from './types';
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

import { CHECK_DJONLINE_TRACKS } from './types';
import trackService from '../services/tracks';

export const getDjonlineTracks = (
  studioId,
  date,
  startTime,
  endTime
) => async dispatch => {
  try {
    const tracks = await trackService.checkDjonlineTracks(
      studioId,
      date,
      startTime,
      endTime
    );
    dispatch({
      type: CHECK_DJONLINE_TRACKS,
      data: tracks
    });
  } catch (error) {
    console.log(error);
  }
};

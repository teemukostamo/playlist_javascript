import { GET_DJONLINE_TRACKS, GET_ONE_REPORT, SET_LOADING } from './types';
import trackService from '../services/tracks';
import reportService from '../services/reports';

export const getDjonlineTracks = searchParams => async dispatch => {
  try {
    dispatch({
      type: SET_LOADING
    });
    const tracks = await trackService.checkDjonlineTracks(searchParams);
    // console.log(searchParams);
    // const report = await reportService.getOne(searchParams.report_id);
    // console.log('track actions report', report);
    // console.log('track actions dispatch data', tracks);
    dispatch({
      type: GET_DJONLINE_TRACKS,
      data: tracks
    });
  } catch (error) {
    console.log(error);
  }
};

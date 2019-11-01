import {
  GET_ONE_REPORT,
  GET_REPORT_DETAILS,
  CREATE_REPORT,
  UPDATE_REPORT,
  SET_LOADING
} from '../actions/types';
import reportService from '../services/reports';

// get one report with tracks by report id
export const getOneReport = id => async dispatch => {
  try {
    dispatch({
      type: SET_LOADING
    });
    const report = await reportService.getOne(id);
    // console.log('reportreducer', report);
    dispatch({
      type: GET_ONE_REPORT,
      data: report,
      id
    });
  } catch (error) {
    console.log(error);
    // dispatch({
    //   type: REPORT_ERROR,
    //   payload: error.response.data
    // });
  }
};

// add track to a report
export const addTrackToReport = trackToAdd => async dispatch => {
  try {
    dispatch({
      type: SET_LOADING
    });
    let track = await reportService.addTrackToReport(trackToAdd);
    console.log('add track to report track', track);
    const report = await reportService.getOne(track.report_id);
    console.log('reportactions', report);
    dispatch({
      type: GET_ONE_REPORT,
      data: report
    });
  } catch (error) {
    console.log(error);
  }
};

// delete track from report¨
export const deleteTrackFromReport = params => async dispatch => {
  try {
    dispatch({
      type: SET_LOADING
    });
    let deletedTrack = await reportService.deleteTrackFromReport(
      params.report_track_id
    );
    console.log(deletedTrack);
    const report = await reportService.getOne(params.report_id);
    console.log('reportactions', report);
    dispatch({
      type: GET_ONE_REPORT,
      data: report
    });
  } catch (error) {
    console.log(error);
  }
};

// get report details by report id
export const getReportDetails = id => async dispatch => {
  try {
    dispatch({
      type: SET_LOADING
    });
    let report = await reportService.getReportDetails(id);
    report = report[0];
    console.log('report actions report', report);
    dispatch({
      type: GET_REPORT_DETAILS,
      data: report,
      id
    });
  } catch (error) {
    console.log(error);
    // dispatch({
    //   type: REPORT_ERROR,
    //   payload: error.response.data
    // });
  }
};

// create new report
export const createReport = newReport => async dispatch => {
  try {
    dispatch({
      type: SET_LOADING
    });
    const report = await reportService.createReport(newReport);
    dispatch({
      type: CREATE_REPORT,
      data: report
    });
  } catch (error) {
    console.log(error);
    // dispatch({
    //   type: REPORT_ERROR,
    //   payload: error.response.data
    // });
  }
};

export const updateReport = updatedReport => async dispatch => {
  try {
    dispatch({
      type: SET_LOADING
    });
    const report = await reportService.updateReport(updatedReport);
    dispatch({
      type: UPDATE_REPORT,
      data: report
    });
  } catch (error) {
    console.log(error);
  }
};

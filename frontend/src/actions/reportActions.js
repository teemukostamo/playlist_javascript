import {
  GET_ONE_REPORT,
  GET_REPORT_DETAILS,
  SET_EDIT_TRACK_ID,
  CREATE_REPORT,
  UPDATE_REPORT,
  CHECK_FOR_DELETE,
  UNCHECK_FOR_DELETE,
  CREATE_NEW_PROGRAM,
  SET_LOADING
} from '../actions/types';
import reportService from '../services/reports';
import programService from '../services/programs';

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

export const setEditTrackId = id => async dispatch => {
  dispatch({
    type: SET_EDIT_TRACK_ID,
    data: id
  });
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
    const updateSortableRank = await reportService.updateSortableRank(
      params.remainingTracks
    );
    console.log(updateSortableRank);
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
    if (newReport.program_id === '' && newReport.new_program_name !== '') {
      const newProgram = {
        name: newReport.new_program_name,
        user_id: newReport.user_id
      };
      const program = await programService.createProgram(newProgram);
      dispatch({
        type: CREATE_NEW_PROGRAM,
        data: program
      });
      const newReportWithNewProgram = {
        ...newReport,
        program_id: program.id,
        display: 1
      };
      console.log('new report with new program', newReportWithNewProgram);
      const report = await reportService.createReport(newReportWithNewProgram);
      dispatch({
        type: CREATE_REPORT,
        data: report
      });
    }
    const report = await reportService.createReport(newReport);
    dispatch({
      type: CREATE_REPORT,
      data: report
    });
  } catch (error) {
    console.log(error);
  }
};

export const copyReport = (
  reportDetailsToCopy,
  reportTracksToCopy
) => async dispatch => {
  dispatch({
    type: SET_LOADING
  });
  const report = await reportService.createReport(reportDetailsToCopy);
  dispatch({
    type: CREATE_REPORT,
    data: report
  });
  reportTracksToCopy.forEach(async track => {
    const trackToAdd = {
      ...track,
      report_id: report.id,
      report_track_id: null
    };
    let newTrack = await reportService.addTrackToReport(trackToAdd);
    console.log('add track to report track', newTrack);
  });
  const newReport = await reportService.getOne(report.id);
  console.log('reportactions', report);
  dispatch({
    type: GET_ONE_REPORT,
    data: newReport
  });
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

export const checkForDelete = id => async dispatch => {
  try {
    console.log('id to add to delete tracks', id);
    dispatch({
      type: CHECK_FOR_DELETE,
      data: id
    });
  } catch (error) {
    console.log(error);
  }
};

export const unCheckForDelete = id => async dispatch => {
  try {
    console.log('uncheckd id to add to delete tracks', id);
    dispatch({
      type: UNCHECK_FOR_DELETE,
      data: id
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteChecked = (
  idsToDelete,
  report_id,
  remainingTracks
) => async dispatch => {
  try {
    dispatch({
      type: SET_LOADING
    });
    idsToDelete.forEach(async id => {
      let deletedTrack = await reportService.deleteTrackFromReport(id);
      console.log(deletedTrack);
    });
    const updateSortableRank = await reportService.updateSortableRank(
      remainingTracks
    );
    console.log(updateSortableRank);
    console.log('array of ids to delete from report', idsToDelete);
    const report = await reportService.getOne(report_id);
    console.log('reportactions', report);
    dispatch({
      type: GET_ONE_REPORT,
      data: report
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateSortableRank = (newOrder, report_id) => async dispatch => {
  try {
    dispatch({
      type: SET_LOADING
    });
    const updateSortableRank = await reportService.updateSortableRank(newOrder);
    console.log(updateSortableRank);
    const report = await reportService.getOne(report_id);
    console.log('reportactions', report);
    dispatch({
      type: GET_ONE_REPORT,
      data: report
    });
  } catch (error) {
    console.log(error);
  }
};

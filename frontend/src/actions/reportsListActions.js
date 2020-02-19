import {
  GET_ALL_REPORTS_BY_DATE,
  GET_ALL_IN_PROGRESS,
  SET_LOADING,
  CLEAR_CURRENT_REPORT,
  DELETE_REPORT,
  FILTER_BY_USER_ID,
  FILTER_BY_STATUS,
  FILTER_BY_TEXT
} from './types';
import reportService from '../services/reports';
// get a list of reports by user_id, date

// get a list of reports by date
export const getAllReportsByDate = date => async dispatch => {
  try {
    dispatch({
      type: SET_LOADING
    });
    dispatch({
      type: CLEAR_CURRENT_REPORT
    });
    const reports = await reportService.getAllByDate(date);
    // console.log('reportreducer', report);
    dispatch({
      type: GET_ALL_REPORTS_BY_DATE,
      data: reports,
      date
    });
  } catch (error) {
    console.log(error);
  }
};

// get a list of reports by date
export const getAllReportsByDateByUser = (date, user) => async dispatch => {
  try {
    dispatch({
      type: SET_LOADING
    });
    dispatch({
      type: CLEAR_CURRENT_REPORT
    });
    const reports = await reportService.getAllByDateByUser(date, user);
    // console.log('reportreducer', report);
    dispatch({
      type: GET_ALL_REPORTS_BY_DATE,
      data: reports,
      date
    });
  } catch (error) {
    console.log(error);
  }
};

// get all in progress by current user for front page
export const getAllInProgress = id => async dispatch => {
  try {
    dispatch({
      type: SET_LOADING
    });
    dispatch({
      type: CLEAR_CURRENT_REPORT
    });
    const reports = await reportService.getAllInProgress(id);
    // console.log('reportreducer', report);
    dispatch({
      type: GET_ALL_IN_PROGRESS,
      data: reports
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteInProgressReport = params => async dispatch => {
  try {
    dispatch({
      type: SET_LOADING
    });
    await reportService.deleteReport(params.report_id);
    const reports = await reportService.getAllInProgress(params.user_id);
    dispatch({
      type: GET_ALL_IN_PROGRESS,
      data: reports
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteReport = id => async dispatch => {
  try {
    dispatch({
      type: SET_LOADING
    });
    await reportService.deleteReport(id);
    dispatch({
      type: DELETE_REPORT,
      data: id
    });
  } catch (error) {
    console.log(error);
  }
};

export const filterByUserId = id => dispatch => {
  dispatch({
    type: FILTER_BY_USER_ID,
    data: id
  });
};

export const filterByStatus = status => dispatch => {
  dispatch({
    type: FILTER_BY_STATUS,
    data: status
  });
};

export const filterByText = text => async dispatch => {
  dispatch({
    type: FILTER_BY_TEXT,
    data: text
  });
};

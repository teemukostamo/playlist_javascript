import {
  GET_ALL_REPORTS_BY_DATE,
  GET_ALL_IN_PROGRESS,
  SET_LOADING,
  CLEAR_CURRENT_REPORT,
  SORT_BY_USER_ID,
  SORT_BY_STATUS,
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

export const sortByUserId = id => dispatch => {
  console.log('id to filter', id);
  dispatch({
    type: SORT_BY_USER_ID,
    data: id
  });
};

export const sortByStatus = status => dispatch => {
  console.log('status to filter', status);
  dispatch({
    type: SORT_BY_STATUS,
    data: status
  });
};

export const filterByText = text => async dispatch => {
  console.log('text to filter', text);
  dispatch({
    type: FILTER_BY_TEXT,
    data: text
  });
};

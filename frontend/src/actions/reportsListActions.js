import {
  GET_ALL_REPORTS_BY_DATE,
  SET_LOADING,
  CLEAR_CURRENT_REPORT,
  SORT_BY_USER_ID
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

export const sortByUserId = id => async dispatch => {
  console.log('id to filter', id);
  dispatch({
    type: SORT_BY_USER_ID,
    data: id
  });
};

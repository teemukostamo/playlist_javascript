import { GET_ALL_REPORTS_BY_DATE, SET_LOADING, REPORT_ERROR } from './types';
import reportService from '../services/reports';

// get a list of reports by user_id, date

// get a list of reports by date
export const getAllReportsByDate = date => async dispatch => {
  try {
    setLoading();
    const reports = await reportService.getAllByDate(date);
    // console.log('reportreducer', report);
    dispatch({
      type: GET_ALL_REPORTS_BY_DATE,
      data: reports,
      date
    });
  } catch (error) {
    dispatch({
      type: REPORT_ERROR,
      payload: error.response.data
    });
  }
};

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};

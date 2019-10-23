import {
  GET_ONE_REPORT,
  GET_REPORT_DETAILS,
  SET_LOADING
} from '../actions/types';
import reportService from '../services/reports';

// get one report with tracks by report id
export const getOneReport = id => async dispatch => {
  setLoading();
  const report = await reportService.getOne(id);
  // console.log('reportreducer', report);
  dispatch({
    type: GET_ONE_REPORT,
    data: report,
    id
  });
};

// get report details by report id
export const getReportDetails = id => async dispatch => {
  setLoading();
  const report = await reportService.getReportDetails(id);
  dispatch({
    type: GET_REPORT_DETAILS,
    data: report,
    id
  });
};

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};

import {
  GET_ONE_REPORT,
  GET_REPORT_DETAILS,
  SET_LOADING
} from '../actions/types';
import reportService from '../services/reports';

// get one report with tracks by report id
export const getOneReport = id => async dispatch => {
  try {
    setLoading();
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

// get report details by report id
export const getReportDetails = id => async dispatch => {
  try {
    setLoading();
    const report = await reportService.getReportDetails(id);
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

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};

import {
  GET_ALL_REPORT_TRANSFERS,
  GENERATE_REPORT_TRANSFER,
  SET_LOADING
} from './types';
import reportService from '../services/reports';

// get a list of reports by date
export const getAllTransfers = () => async dispatch => {
  try {
    dispatch({
      type: SET_LOADING
    });
    const reports = await reportService.getAllTransfers();
    // console.log('reportreducer', report);
    dispatch({
      type: GET_ALL_REPORT_TRANSFERS,
      data: reports
    });
  } catch (error) {
    console.log(error);
  }
};

export const generateReportTransfer = params => async dispatch => {
  try {
    dispatch({
      type: SET_LOADING
    });
    const transferredReport = await reportService.generateReportDownload(
      params
    );
    const reports = await reportService.getAllTransfers();
    dispatch({
      type: GET_ALL_REPORT_TRANSFERS,
      data: reports
    });
    dispatch({
      type: GENERATE_REPORT_TRANSFER,
      data: transferredReport
    });
  } catch (error) {
    console.log(error);
  }
};

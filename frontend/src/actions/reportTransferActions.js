import { GET_ALL_REPORT_TRANSFERS, SET_LOADING } from './types';
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

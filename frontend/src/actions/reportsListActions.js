import { GET_ALL_REPORTS_BY_DATE } from './types';
import reportService from '../services/reports';

// get a list of reports by user_id, date

// get a list of reports by date
export const getAllReportsByDate = date => async dispatch => {
  const reports = await reportService.getAllByDate(date);
  // console.log('reportreducer', report);
  dispatch({
    type: GET_ALL_REPORTS_BY_DATE,
    data: reports,
    date
  });
};

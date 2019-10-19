import { GET_ONE_REPORT, GET_ALL_REPORTS_BY_DATE } from '../actions/types';
import reportService from '../services/reports';

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

// get a list of reports by user_id, date

// get one report with tracks by report id
export const getOneReport = id => async dispatch => {
  const report = await reportService.getOne(id);
  // console.log('reportreducer', report);
  dispatch({
    type: GET_ONE_REPORT,
    data: report,
    id
  });
};

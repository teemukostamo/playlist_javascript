import { GET_ONE_REPORT } from '../actions/types';
import reportService from '../services/reports';

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

import reportService from '../services/reports';

const reportReducer = (state = [], action) => {
  console.log('reportreducer state now: ', state);
  console.log('reportreducer action', action);
  console.log(action.type);

  switch (action.type) {
    case 'GET_ONE_REPORT':
      return action.data;

    default:
      return state;
  }
};

// get a list of reports by date

// get a list of reports by user_id, date

// get one report with tracks by report id
export const getOneReport = id => {
  return async dispatch => {
    const report = await reportService.getOne(id);
    console.log('reportreducer', report);
    dispatch({
      type: 'GET_ONE_REPORT',
      data: report,
      id
    });
  };
};

export default reportReducer;

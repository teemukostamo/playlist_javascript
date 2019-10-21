export const GET_ALL_REPORTS_BY_DATE = 'GET_ALL_REPORTS_BY_DATE';

const reportListReducer = (state = [], action) => {
  console.log('report list reducer state now: ', state);
  console.log('report list reducer action', action);
  console.log(action.type);

  switch (action.type) {
    // date is YYYY-MM
    case GET_ALL_REPORTS_BY_DATE:
      return action.data;

    default:
      return state;
  }
};

export default reportListReducer;

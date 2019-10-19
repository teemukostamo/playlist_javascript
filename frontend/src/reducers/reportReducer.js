import { GET_ONE_REPORT } from '../actions/types';

const reportReducer = (state = [], action) => {
  console.log('reportreducer state now: ', state);
  console.log('reportreducer action', action);
  console.log(action.type);

  switch (action.type) {
    case GET_ONE_REPORT:
      return action.data;

    default:
      return state;
  }
};

export default reportReducer;

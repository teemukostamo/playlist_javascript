const initialState = {
  message: null,
  type: null
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data;

    case 'CLEAR_NOTIFICATION':
      return initialState;

    default:
      return state;
  }
};

export const setNotification = (message, type) => {
  const content = {
    message,
    type
  };
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: content
    });
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      });
    }, 3000);
  };
};

export default notificationReducer;

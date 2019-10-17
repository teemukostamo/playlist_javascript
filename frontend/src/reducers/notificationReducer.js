const initialState = {
  message: null
};

const notificationReducer = (state = initialState, action) => {
  console.log('action', action);
  switch (action.type) {
    case 'NOTIFICATION':
      return {
        ...state,
        message: action.message
      };

    case 'CLEAR':
      return {
        ...state,
        message: null
      };

    default:
      return state;
  }
};

const setNotification = (id, message) => {
  console.log(message);
  return dispatch => {
    dispatch({
      type: 'NOTIFICATION',
      id,
      message
    });
  };
};

const clearNotification = id => {
  return {
    type: 'CLEAR',
    id
  };
};

let nextNotificationId = 0;
export function showNotificationWithTimeout(text, duration) {
  duration = duration * 1000;
  return function(dispatch) {
    const id = nextNotificationId++;
    dispatch(setNotification(id, text));

    setTimeout(() => {
      dispatch(clearNotification(id));
    }, duration);
  };
}

export default notificationReducer;

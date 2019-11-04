const initialState = {
  message: null,
  type: null
};

const notificationReducer = (state = initialState, action) => {
  console.log('action', action);
  console.log(state);
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
  console.log(message);
  console.log(type);
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

// const setNotification = (id, message) => {
//   console.log(message);
//   return dispatch => {
//     dispatch({
//       type: 'NOTIFICATION',
//       id,
//       message
//     });
//   };
// };

// const clearNotification = id => {
//   return {
//     type: 'CLEAR',
//     id
//   };
// };

// let nextNotificationId = 0;
// export function showNotificationWithTimeout(text, duration) {
//   duration = duration * 1000;
//   return function(dispatch) {
//     const id = nextNotificationId++;
//     dispatch(setNotification(id, text));

//     setTimeout(() => {
//       dispatch(clearNotification(id));
//     }, duration);
//   };
// }

export default notificationReducer;

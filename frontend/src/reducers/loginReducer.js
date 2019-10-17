import loginService from '../services/login';

const initialState = {
  user: null
};

const loginReducer = (state = initialState, action) => {
  console.log('loginreducer state', state);
  console.log('loginreducer action', action);

  switch (action.type) {
    case 'INIT_USER':
      return action.data;

    case 'LOGOUT':
      return initialState;

    case 'LOGIN':
      return action.data;

    default:
      return state;
  }
};

export const initializeUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      // set token for logged in user
      // reportService.setToken(user.token);
      dispatch({
        type: 'INIT_USER',
        data: user
      });
    }
  };
};

export const newLogin = (user, errorNotification) => {
  return async dispatch => {
    try {
      const newUser = await loginService.login(user);
      window.localStorage.setItem('loggedUser', JSON.stringify(newUser));
      // set token for logged in user
      // blogService.setToken(newUser.token);
      dispatch({
        type: 'LOGIN',
        data: newUser
      });
    } catch (exception) {
      errorNotification(`väärä käyttäjätunnus tai salasana`, 4);
    }
  };
};

export const logout = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedUser');
    dispatch({
      type: 'LOGOUT'
    });
  };
};

export default loginReducer;

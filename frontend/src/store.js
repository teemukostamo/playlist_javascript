import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import artistReducer from './reducers/artistReducer';
import albumReducer from './reducers/albumReducer';
import trackReducer from './reducers/trackReducer';
import loginReducer from './reducers/loginReducer';
import notificationReducer from './reducers/notificationReducer';
import reportReducer from './reducers/reportReducer';
import userReducer from './reducers/userReducer';
import reportsListReducer from './reducers/reportsListReducer';
import programReducer from './reducers/programReducer';
import searchReducer from './reducers/searchReducer';

const appReducer = combineReducers({
  artist: artistReducer,
  album: albumReducer,
  track: trackReducer,
  login: loginReducer,
  notification: notificationReducer,
  report: reportReducer,
  reportsList: reportsListReducer,
  programs: programReducer,
  search: searchReducer,
  users: userReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    // eslint-disable-next-line no-param-reassign
    state = undefined;
  }
  return appReducer(state, action);
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;

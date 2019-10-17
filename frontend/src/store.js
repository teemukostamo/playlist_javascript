import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import loginReducer from './reducers/loginReducer';
import notificationReducer from './reducers/notificationReducer';
import reportReducer from './reducers/reportReducer';
import userReducer from './reducers/userReducer';

const reducer = combineReducers({
  login: loginReducer,
  notification: notificationReducer,
  report: reportReducer,
  users: userReducer
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;

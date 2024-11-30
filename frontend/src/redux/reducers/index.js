// src/reducers/index.js
import { combineReducers } from 'redux';
import authReducer from './auth';
import profileReducer from './profile'
// Import other reducers if necessary

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
});

export default rootReducer;

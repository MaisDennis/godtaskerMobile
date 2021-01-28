import { combineReducers } from 'redux';
import worker from './worker/reducer';
import user from './user/reducer';
import auth from './auth/reducer';

export default combineReducers({worker, user, auth});

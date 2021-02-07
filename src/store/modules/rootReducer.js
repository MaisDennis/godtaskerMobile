import { combineReducers } from 'redux';
import worker from './worker/reducer';
import user from './user/reducer';
import auth from './auth/reducer';
import message from './message/reducer';
import contact from './contact/reducer';
import task from './task/reducer';

export default combineReducers({worker, user, auth, message, contact, task});

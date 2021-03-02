import { combineReducers } from 'redux';


import auth from './auth/reducer';
import contact from './contact/reducer';
import message from './message/reducer';
import task from './task/reducer';
import user from './user/reducer';
import worker from './worker/reducer';

export default combineReducers({ auth, contact, message, task, user, worker });

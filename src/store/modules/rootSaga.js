import { all} from 'redux-saga/effects';
import worker from './worker/sagas';
import user from './user/sagas';
import auth from './auth/sagas';


export default function* rootSaga() {
  return yield all([worker, user, auth]);
}

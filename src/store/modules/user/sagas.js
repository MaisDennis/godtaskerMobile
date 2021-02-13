import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';
// -----------------------------------------------------------------------------
import api from '~/services/api';
import { updateProfileSuccess, updateProfileFailure } from './actions';
// -----------------------------------------------------------------------------
export function* updateProfile({ payload }) {

  try {
    const {
      first_name, last_name, user_name,
      oldPassword, password, confirmPassword,
      phonenumber, birth_date, gender,
      image,
    } = payload;
    console.tron.log(payload)

    let response = null
    if (!image) {
      response = yield call(api.put, 'users/no-photo', {
        first_name,
        last_name,
        user_name,
        oldPassword,
        password,
        confirmPassword,
        phonenumber,
        birth_date,
        gender,
        // avatar_id
      });
    } else {
      const imageResponse = yield call(api.get, 'files', {
        params: { image },
      })
      const avatar_id = imageResponse.data[0].id
      response = yield call(api.put, 'users', {
        first_name,
        last_name,
        user_name,
        oldPassword,
        password,
        confirmPassword,
        phonenumber,
        birth_date,
        gender,
        avatar_id
      });
    }

    // toast.success('Perfil atualizado com sucesso!');
    console.log(response.data);
    yield put(updateProfileSuccess(response.data));

  } catch (error) {
    // toast.error(error.response.data.error);
    console.tron.log(error.response.data.error);
    // toast.error('Erro ao atualizar perfil, confira os seus dados!');
    // yield put(updateProfileFailure());
  }
}
// -----------------------------------------------------------------------------
export default all([
  takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)
]);

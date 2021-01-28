import { takeLatest, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
// -----------------------------------------------------------------------------
import { updateImageSuccess, updateImageFailure } from './actions';
// -----------------------------------------------------------------------------
export function* updateImage({ payload }) {
  try {
    const image  = payload.data;
    // toast.success('Imagem atualizado com sucesso!');
    yield put(updateImageSuccess(image));

  } catch (err) {
    toast.error('Erro ao atualizar imagem!');
    yield put(updateImageFailure());
  }
}

// -----------------------------------------------------------------------------
export default all([
  takeLatest('@image/UPDATE_IMAGE_REQUEST', updateImage)
]);

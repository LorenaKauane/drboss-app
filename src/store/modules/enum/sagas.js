import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';

import { getEnumSuccess, getEnumFailure } from './actions';

export function* getEnums({ payload }) {
  try {

    const response = yield call(api.get, `enum`);

    yield put(getEnumSuccess(response.data));

  } catch (err) {
    Alert.alert(
      'Falha!',
      'Falhou ao buscar status'
    );
    yield put(getEnumFailure());
  }
}

export default all([
  takeLatest('GET_ENUM', getEnums)
]);

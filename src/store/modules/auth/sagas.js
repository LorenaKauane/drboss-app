import {Alert} from 'react-native';
import {takeLatest, call, put, all} from 'redux-saga/effects';

import api from '../../../services/api';

import {signInSuccess, signFailure} from './actions';

export function* signIn({payload}) {
  try {
    const {email, senha} = payload;

    const response = yield call(api.post, 'autenticacao', {
      email,
      senha,
    });

    const {token, tenantId, usuario} = response.data;
    api.defaults.headers.Authorization = `Bearer ${token}`;
    api.defaults.headers.tenantId = tenantId;

    yield put(signInSuccess(token, tenantId, usuario));

    // history.push('/dashboard');
  } catch (err) {
    Alert.alert('Falha na autenticação', 'Verifique seus dados');
    yield put(signFailure());
  }
}

export function* signUp({payload}) {
  try {
    const {nome, email, senha, navigation} = payload;

    yield call(api.post, 'autenticacao/cria-conta', {
      nome,
      email,
      senha,
    });

    Alert.alert('Salvo!', 'Cadastro salvo com sucesso! Faça seu login!');

    navigation.navigate('Login');
  } catch (err) {
    Alert.alert(
      'Cadastro falhou',
      'Aconteceu alguma coisa. Verifique seus dados'
    );
    yield put(signFailure());
  }
}

export function setToken({payload}) {
  if (!payload) return;

  const {token, tenantId} = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
    api.defaults.headers.tenantId = tenantId;
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
]);

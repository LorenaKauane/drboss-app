import React from 'react';
import {Alert} from 'react-native';
import {takeLatest, call, put, all} from 'redux-saga/effects';
import api from '~/services/api';

import {
  getServicoSuccess,
  getServicoFailure,
  createServicoFailure,
  createServicoSuccess,
  addServico,
} from './actions';

export function* getServico() {
  try {
    const response = yield call(api.get, `servico`);
    yield put(getServicoSuccess(response.data));
  } catch (err) {
    Alert.alert('Falha!', 'Falhou ao buscar servicos');
    yield put(getServicoFailure());
  }
}

export function* salvarServico({payload}) {
  try {
    const {nome, valor} = payload.data;
    const response = yield call(api.post, 'servico', {
      nome,
      valor,
    });

    Alert.alert('Salvo!', 'Cadastro salvo com sucesso!');
    console.log(response.data);
    yield put(addServico(response.data));
  } catch (err) {
    console.log(err);
    Alert.alert('Falha!', 'Falhou ao salvar servico');
    yield put(createServicoFailure());
  }
}

export function* editaServico({payload}) {
  try {
    const bodyFormData = payload.data;
    const navigation = payload.navigation;

    const response = yield call(api.put, `servico`, bodyFormData);
    Alert.alert('Salvo!', 'Cadastro salvo com sucesso!');

    navigation.navigate('Paciente');
    yield put(createServicoSuccess(response.data));
  } catch (err) {
    Alert.alert('Falha!', 'Falhou ao salvar servico');
    yield put(createServicoFailure());
  }
}

export default all([
  takeLatest('GET_SERVICO', getServico),
  takeLatest('CREATE_SERVICO', salvarServico),
]);

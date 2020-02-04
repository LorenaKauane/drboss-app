import React from 'react';
import {Alert} from 'react-native';
import {takeLatest, call, put, all} from 'redux-saga/effects';
import api from '~/services/api';

import {
  getProntuarioSuccess,
  getProntuarioFailure,
  createProntuarioFailure,
  createProntuarioSuccess,
} from './actions';

export function* getProntuario({payload}) {
  try {
    const response = yield call(api.get, `prontuario/${payload.pacienteId}`);
    yield put(getProntuarioSuccess(response.data));
  } catch (err) {
    Alert.alert('Falha!', 'Falhou ao buscar prontuarios');
    yield put(getProntuarioFailure());
  }
}

export function* salvarProntuario({payload}) {
  try {
    const bodyFormData = payload.data;
    const navigation = payload.navigation;

    console.log(bodyFormData);
    const response = yield call(api.post, `prontuario`, bodyFormData);
    Alert.alert('Salvo!', 'Cadastro salvo com sucesso!');
    // console.log(response);
    navigation.navigate('Paciente');
    yield put(createProntuarioSuccess(response.data));
  } catch (err) {
    console.log(err.response);
    Alert.alert('Falha!', 'Falhou ao salvar prontuario');
    yield put(createProntuarioFailure());
  }
}

export function* editaProntuario({payload}) {
  try {
    const bodyFormData = payload.data;
    const navigation = payload.navigation;

    const response = yield call(api.put, `prontuario`, bodyFormData);
    Alert.alert('Salvo!', 'Cadastro salvo com sucesso!');

    navigation.navigate('Paciente');
    yield put(createProntuarioSuccess(response.data));
  } catch (err) {
    Alert.alert('Falha!', 'Falhou ao salvar prontuario');
    yield put(createProntuarioFailure());
  }
}

export default all([
  takeLatest('GET_PRONTUARIO', getProntuario),
  takeLatest('CREATE_PRONTUARIO', salvarProntuario),
  takeLatest('ALTER_PRONTUARIO', editaProntuario),
]);

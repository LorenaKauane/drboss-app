import React from 'react';
import {Alert} from 'react-native';
import {takeLatest, call, put, all} from 'redux-saga/effects';
import api from '../../../services/api';

import {
  getPacienteSuccess,
  getPacienteFailure,
  createPacienteFailure,
  createPacienteSuccess,
} from './actions';

export function* getPaciente() {
  try {
    const response = yield call(api.get, `paciente`);
    yield put(getPacienteSuccess(response.data));
  } catch (err) {
    Alert.alert('Falha!', 'Falhou ao buscar pacientes');
    yield put(getPacienteFailure());
  }
}

export function* getPacienteNome({payload}) {
  try {
    const {nome} = payload;
    const response = yield call(api.get, `paciente/${nome}`);
    yield put(getPacienteSuccess(response.data));
  } catch (err) {
    Alert.alert('Falha!', 'Falhou ao buscar pacientes');
    yield put(getPacienteFailure());
  }
}

export function* salvarPaciente({payload}) {
  try {
    const bodyFormData = payload.data;
    const navigation = payload.navigation;

    const response = yield call(api.post, `paciente`, bodyFormData);
    Alert.alert('Salvo!', 'Cadastro salvo com sucesso!');

    navigation.navigate('Paciente');
    yield put(createPacienteSuccess(response.data));
  } catch (err) {
    Alert.alert('Falha!', 'Falhou ao salvar paciente');
    yield put(createPacienteFailure());
  }
}

export function* editaPaciente({payload}) {
  try {
    const bodyFormData = payload.data;
    const navigation = payload.navigation;

    const response = yield call(api.put, `paciente`, bodyFormData);
    Alert.alert('Salvo!', 'Cadastro salvo com sucesso!');

    navigation.navigate('Paciente');
    yield put(createPacienteSuccess(response.data));
  } catch (err) {
    Alert.alert('Falha!', 'Falhou ao salvar paciente');
    yield put(createPacienteFailure());
  }
}

export default all([
  takeLatest('GET_PACIENTE', getPaciente),
  takeLatest('GET_PACIENTE_NOME', getPacienteNome),
  takeLatest('CREATE_PACIENTE', salvarPaciente),
  takeLatest('ALTER_PACIENTE', editaPaciente),
]);

import React from 'react';
import {Alert} from 'react-native';
import {takeLatest, call, put, all} from 'redux-saga/effects';
import api from '../../../services/api';

import {
  getMovimentacaoFinanceiraSuccess,
  getMovimentacaoFinanceiraFailure,
  createMovimentacaoFinanceiraFailure,
  createMovimentacaoFinanceiraSuccess,
  addMovimentacaoFinanceira,
} from './actions';

export function* getMovimentacaoFinanceira({payload}) {
  try {
    const {dtInicio, dtFim} = payload;
    const response = yield call(
      api.get,
      `movimentacao-financeira/${dtInicio}/${dtFim}`
    );
    yield put(getMovimentacaoFinanceiraSuccess(response.data));
  } catch (err) {
    Alert.alert('Falha!', 'Falhou ao buscar movimentacao financeira');
    yield put(getMovimentacaoFinanceiraFailure());
  }
}

export function* salvarMovimentacaoFinanceira({payload}) {
  try {
    const {valor} = payload.data;
    const response = yield call(api.post, 'movimentacao-financeira', {
      valor,
    });

    Alert.alert('Salvo!', 'Cadastro salvo com sucesso!');

    yield put(addMovimentacaoFinanceira(response.data));
  } catch (err) {
    console.log(err.response);
    Alert.alert('Falha!', 'Falhou ao salvar movimentacao financeira');
    yield put(createMovimentacaoFinanceiraFailure());
  }
}

export default all([
  takeLatest('GET_MOVIMENTACAO_FINANCEIRA', getMovimentacaoFinanceira),
  takeLatest('CREATE_MOVIMENTACAO_FINANCEIRA', salvarMovimentacaoFinanceira),
]);

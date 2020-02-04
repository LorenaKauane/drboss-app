import {Alert} from 'react-native';
import {takeLatest, call, put, all} from 'redux-saga/effects';
import api from '~/services/api';
import {
  startOfDay,
  endOfDay,
  format,
} from 'date-fns';
import {
  getConsultaSuccess,
  getConsultaFailure,
  createConsultaSuccess,
  createConsultaFailure,
  getConsulta
} from './actions';

export function* getConsultas({payload}) {
  try {
    console.log('payload',payload)
    const {dtInicio, dtFim} = payload;
    const response = yield call(api.get, `consulta/${dtInicio}/${dtFim}`);
    yield put(getConsultaSuccess(response.data));
  } catch (err) {
    Alert.alert('Falha!', 'Falhou ao buscar consultas');
    yield put(getConsultaFailure());
  }
}

export function* salvarConsulta({payload}) {
  try {
    const data = payload.data;
    const navigation = payload.navigation;
    yield call(api.post, `consulta`, data);
    Alert.alert('Salvo!', 'Cadastro salvo com sucesso!');

    navigation.navigate('Dashboard');
    let dtInicio = format(startOfDay(new Date()), 'yyyy-MM-dd HH:mm');
    let dtFim = format(endOfDay(new Date()), 'yyyy-MM-dd HH:mm');
    // yield getConsulta({dtInicio,dtFim});
    yield put(getConsulta(dtInicio,dtFim));

  } catch (err) {
    console.log(err.response.data)
    Alert.alert('Falha!', 'Falhou ao salvar consulta');
    yield put(createConsultaFailure());
  }
}

export default all([
  takeLatest('GET_CONSULTA', getConsultas),
  takeLatest('CREATE_CONSULTA', salvarConsulta),
]);

import {all} from 'redux-saga/effects';

import auth from './auth/sagas';
import enums from './enum/sagas';
import consulta from './consulta/sagas';
import paciente from './paciente/sagas';
import prontuario from './prontuario/sagas';
import servico from './servico/sagas';

export default function* rootSaga() {
  return yield all([auth, enums, consulta, paciente, prontuario, servico]);
}

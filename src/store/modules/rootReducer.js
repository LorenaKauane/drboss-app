import {combineReducers} from 'redux';

import auth from './auth/reducer';
import enums from './enum/reducer';
import consulta from './consulta/reducer';
import paciente from './paciente/reducer';
import prontuario from './prontuario/reducer';
import servico from './servico/reducer';

export default combineReducers({
  auth,
  enums,
  consulta,
  paciente,
  prontuario,
  servico,
});

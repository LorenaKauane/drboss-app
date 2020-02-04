export function getConsulta(dtInicio, dtFim) {
  return {
    type: 'GET_CONSULTA',
    payload: {dtInicio, dtFim},
  };
}

export function getConsultaSuccess(data) {
  return {
    type: 'GET_CONSULTA_SUCCESS',
    payload: data,
  };
}

export function getConsultaFailure() {
  return {
    type: 'GET_CONSULTA_FAILURE',
  };
}

export function createConsulta(data, navigation) {
  return {
    type: 'CREATE_CONSULTA',
    payload: {data, navigation},
  };
}

export function createConsultaSuccess(data) {
  return {
    type: 'CREATE_CONSULTA_SUCCESS',
    payload: data,
  };
}

export function createConsultaFailure() {
  return {
    type: 'CREATE_CONSULTA_FAILURE',
  };
}

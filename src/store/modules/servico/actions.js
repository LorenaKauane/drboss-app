export function getAllServico(pacienteId) {
  return {
    type: 'GET_SERVICO',
    payload: {pacienteId},
  };
}

export function getServicoSuccess(data) {
  return {
    type: 'GET_SERVICO_SUCCESS',
    payload: data,
  };
}

export function getServicoFailure() {
  return {
    type: 'GET_SERVICO_FAILURE',
  };
}

export function createServico(data) {
  return {
    type: 'CREATE_SERVICO',
    payload: {data},
  };
}

export function createServicoSuccess(data) {
  return {
    type: 'CREATE_SERVICO_SUCCESS',
    payload: data,
  };
}

export function addServico(data) {
  return {
    type: 'ADD_SERVICO',
    payload: data,
  };
}

export function createServicoFailure() {
  return {
    type: 'CREATE_SERVICO_FAILURE',
  };
}

export function deleteServico({id}) {
  return {
    type: 'DELETE_SERVICO',
    payload: {id},
  };
}

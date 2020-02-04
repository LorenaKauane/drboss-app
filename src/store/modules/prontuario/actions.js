export function getAllProntuarioPaciente(pacienteId) {
  return {
    type: 'GET_PRONTUARIO',
    payload: {pacienteId},
  };
}

export function getProntuarioSuccess(data) {
  return {
    type: 'GET_PRONTUARIO_SUCCESS',
    payload: data,
  };
}

export function getProntuarioFailure() {
  return {
    type: 'GET_PRONTUARIO_FAILURE',
  };
}

export function createProntuario(data, navigation) {
  return {
    type: 'CREATE_PRONTUARIO',
    payload: {data, navigation},
  };
}

export function createProntuarioSuccess(data) {
  return {
    type: 'CREATE_PRONTUARIO_SUCCESS',
    payload: data,
  };
}

export function createProntuarioFailure() {
  return {
    type: 'CREATE_PRONTUARIO_FAILURE',
  };
}

export function alterProntuario(data, navigation) {
  return {
    type: 'ALTER_PRONTUARIO',
    payload: {data, navigation},
  };
}

export function alterProntuarioSuccess(data) {
  return {
    type: 'ALTER_PRONTUARIO_SUCCESS',
    payload: data,
  };
}

export function alterProntuarioFailure() {
  return {
    type: 'ALTER_PRONTUARIO_FAILURE',
  };
}
export function deleteProntuario({id}) {
  return {
    type: 'DELETE_PRONTUARIO',
    payload: {id},
  };
}

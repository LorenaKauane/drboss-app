export function getAllPaciente() {
  return {
    type: 'GET_PACIENTE',
  };
}

export function getForNomePaciente({nome}) {
  return {
    type: 'GET_PACIENTE_NOME',
    payload: {nome},
  };
}

export function getPacienteSuccess(data) {
  return {
    type: 'GET_PACIENTE_SUCCESS',
    payload: data,
  };
}

export function getPacienteFailure() {
  return {
    type: 'GET_PACIENTE_FAILURE',
  };
}

export function selecionaPaciente(paciente) {
  return {
    type: 'SELECIONA_PACIENTE',
    payload: paciente,
  };
}

export function createPaciente(data, navigation) {
  return {
    type: 'CREATE_PACIENTE',
    payload: {data, navigation},
  };
}

export function createPacienteSuccess(data) {
  return {
    type: 'CREATE_PACIENTE_SUCCESS',
    payload: data,
  };
}

export function createPacienteFailure() {
  return {
    type: 'CREATE_PACIENTE_FAILURE',
  };
}

export function alterPaciente(data, navigation) {
  return {
    type: 'ALTER_PACIENTE',
    payload: {data, navigation},
  };
}

export function alterPacienteSuccess(data) {
  return {
    type: 'ALTER_PACIENTE_SUCCESS',
    payload: data,
  };
}

export function alterPacienteFailure() {
  return {
    type: 'ALTER_PACIENTE_FAILURE',
  };
}
export function deletePaciente({id}) {
  return {
    type: 'DELETE_PACIENTE',
    payload: {id},
  };
}

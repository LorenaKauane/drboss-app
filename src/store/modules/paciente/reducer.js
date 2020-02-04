import produce from 'immer';
const INITIAL_STATE = {
  paciente: {},
  pacientes: [],
  loadingPacientes: false,
};

export default function consulta(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case 'GET_PACIENTE': {
        draft.loadingPacientes = false;
        break;
      }
      case 'GET_PACIENTE_SUCCESS': {
        draft.pacientes = action.payload;
        draft.loadingPacientes = true;
        break;
      }
      case 'GET_PACIENTE_FAILURE': {
        draft.pacientes = [];
        draft.loadingPacientes = false;
        break;
      }
      case 'CREATE_PACIENTE_SUCCESS': {
        draft.pacientes = action.payload;
        draft.loadingPacientes = true;
        break;
      }
      case 'CREATE_PACIENTE_FAILURE': {
        draft.pacientes = action.payload;
        draft.loadingPacientes = FALSE;
        break;
      }
      case 'ALTER_PACIENTE_SUCCESS': {
        draft.pacientes = action.payload;
        draft.loadingPacientes = true;
        break;
      }
      case 'ALTER_PACIENTE_FAILURE': {
        draft.pacientes = action.payload;
        draft.loadingPacientes = FALSE;
        break;
      }
      case 'SELECIONA_PACIENTE': {
        draft.paciente = action.payload;
        break;
      }
      case 'DELETE_PACIENTE': {
        const {id} = action.payload;
        const pacientes = draft.pacientes.filter(
          paciente => paciente.id !== id
        );
        draft.pacientes = pacientes;
      }

      default:
    }
  });
}

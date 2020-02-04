import produce from 'immer';
const INITIAL_STATE = {
  consultas: [],
  loading: false,
  loadingConsultas: false,
};

export default function consulta(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case 'GET_CONSULTA': {
        draft.loadingConsultas = false;
        break;
      }
      case 'GET_CONSULTA_SUCCESS': {
        draft.consultas = action.payload;
        draft.loadingConsultas = true;
        break;
      }
      case 'GET_CONSULTA_FAILURE': {
        draft.consultas = [];
        draft.loadingConsultas = false;
        break;
      }
      case 'CREATE_CONSULTA_SUCCESS': {
        draft.loadingConsultas = true;
        break;
      }
      case 'CREATE_CONSULTA_FAILURE': {
        draft.consultas = action.payload;
        draft.loadingConsultas = false;
        break;
      }
      default:
    }
  });
}

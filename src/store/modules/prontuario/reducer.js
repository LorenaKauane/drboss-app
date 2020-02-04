import produce from 'immer';

const INITIAL_STATE = {
  prontuario: {},
  prontuarios: [],
  loadingProntuario: false,
};

export default function prontuario(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case 'GET_PRONTUARIO': {
        draft.loadingProntuario = false;
        break;
      }
      case 'GET_PRONTUARIO_SUCCESS': {
        draft.prontuarios = action.payload;
        draft.loadingProntuario = true;
        break;
      }
      case 'GET_PRONTUARIO_FAILURE': {
        draft.prontuarios = [];
        draft.loadingProntuario = false;
        break;
      }
      case 'CREATE_PRONTUARIO_SUCCESS': {
        draft.prontuarios = action.payload;
        draft.loadingProntuario = true;
        break;
      }
      case 'CREATE_PRONTUARIO_FAILURE': {
        draft.prontuarios = action.payload;
        draft.loadingProntuario = FALSE;
        break;
      }
      case 'ALTER_PRONTUARIO_SUCCESS': {
        draft.prontuarios = action.payload;
        draft.loadingProntuario = true;
        break;
      }
      case 'ALTER_PRONTUARIO_FAILURE': {
        draft.prontuarios = action.payload;
        draft.loadingProntuario = FALSE;
        break;
      }

      case 'DELETE_PRONTUARIO': {
        const {id} = action.payload;
        const prontuarios = draft.prontuarios.filter(
          prontuario => prontuario.id !== id
        );
        draft.prontuarios = prontuarios;
      }

      default:
    }
  });
}

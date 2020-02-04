import produce from 'immer';

const INITIAL_STATE = {
  servico: {},
  servicos: [],
  loadingProntuario: false,
};

export default function servico(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case 'GET_SERVICO': {
        draft.loadingProntuario = false;
        break;
      }
      case 'GET_SERVICO_SUCCESS': {
        draft.servicos = action.payload;
        draft.loadingProntuario = true;
        break;
      }
      case 'GET_SERVICO_FAILURE': {
        draft.servicos = [];
        draft.loadingProntuario = false;
        break;
      }

      case 'ADD_SERVICO': {
        draft.servicos.push(action.payload);
        draft.loadingProntuario = true;
        break;
      }
      case 'CREATE_SERVICO_SUCCESS': {
        draft.servicos = action.payload;
        draft.loadingProntuario = true;
        break;
      }
      case 'CREATE_SERVICO_FAILURE': {
        draft.servicos = action.payload;
        draft.loadingProntuario = FALSE;
        break;
      }

      case 'DELETE_SERVICO': {
        const {id} = action.payload;
        const servicos = draft.servicos.filter(servico => servico.id !== id);
        draft.servicos = servicos;
      }

      default:
    }
  });
}

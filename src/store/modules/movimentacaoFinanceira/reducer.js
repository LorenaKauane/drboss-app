import produce from 'immer';

const INITIAL_STATE = {
  movimentacao_financeira: {},
  movimentacoes_financeiras: [],
  valorTotal: 0,
  loadingMovimentacaoFinanceira: false,
};

export default function movimentacao_financeira(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case 'GET_MOVIMENTACAO_FINANCEIRA': {
        draft.loadingMovimentacaoFinanceira = false;
        break;
      }
      case 'GET_MOVIMENTACAO_FINANCEIRA_SUCCESS': {
        draft.movimentacoes_financeiras = action.payload;
        draft.valorTotal = draft.movimentacoes_financeiras.reduce(
          (total, valor) => total + parseInt(valor.valor),
          0
        );
        draft.loadingMovimentacaoFinanceira = true;
        break;
      }
      case 'GET_MOVIMENTACAO_FINANCEIRA_FAILURE': {
        draft.movimentacoes_financeiras = [];
        draft.loadingMovimentacaoFinanceira = false;
        break;
      }

      case 'ADD_MOVIMENTACAO_FINANCEIRA': {
        draft.movimentacoes_financeiras.push(action.payload);
        draft.valorTotal = draft.movimentacoes_financeiras.reduce(
          (total, valor) => total + parseInt(valor.valor),
          0
        );
        draft.loadingMovimentacaoFinanceira = true;
        break;
      }
      case 'CREATE_MOVIMENTACAO_FINANCEIRA_SUCCESS': {
        draft.movimentacoes_financeiras = action.payload;
        draft.valorTotal = draft.movimentacoes_financeiras.reduce(
          (total, valor) => total + parseInt(valor.valor),
          0
        );
        draft.loadingMovimentacaoFinanceira = true;
        break;
      }
      case 'CREATE_MOVIMENTACAO_FINANCEIRA_FAILURE': {
        draft.movimentacoes_financeiras = action.payload;
        draft.loadingMovimentacaoFinanceira = FALSE;
        break;
      }

      case 'DELETE_MOVIMENTACAO_FINANCEIRA': {
        const {id} = action.payload;
        const movimentacoes_financeiras = draft.movimentacoes_financeiras.filter(
          movimentacao_financeira => movimentacao_financeira.id !== id
        );
        draft.movimentacoes_financeiras = movimentacoes_financeiras;
        draft.valorTotal = draft.movimentacoes_financeiras.reduce(
          (total, valor) => total + parseInt(valor.valor),
          0
        );
      }

      default:
    }
  });
}

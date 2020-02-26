export function getAllMovimentacaoFinanceira(dtInicio, dtFim) {
  return {
    type: 'GET_MOVIMENTACAO_FINANCEIRA',
    payload: {dtInicio, dtFim},
  };
}

export function getMovimentacaoFinanceiraSuccess(data) {
  return {
    type: 'GET_MOVIMENTACAO_FINANCEIRA_SUCCESS',
    payload: data,
  };
}

export function getMovimentacaoFinanceiraFailure() {
  return {
    type: 'GET_MOVIMENTACAO_FINANCEIRA_FAILURE',
  };
}

export function createMovimentacaoFinanceira(data) {
  return {
    type: 'CREATE_MOVIMENTACAO_FINANCEIRA',
    payload: {data},
  };
}

export function createMovimentacaoFinanceiraSuccess(data) {
  return {
    type: 'CREATE_MOVIMENTACAO_FINANCEIRA_SUCCESS',
    payload: data,
  };
}

export function addMovimentacaoFinanceira(data) {
  return {
    type: 'ADD_MOVIMENTACAO_FINANCEIRA',
    payload: data,
  };
}

export function createMovimentacaoFinanceiraFailure() {
  return {
    type: 'CREATE_MOVIMENTACAO_FINANCEIRA_FAILURE',
  };
}

export function deleteMovimentacaoFinanceira({id}) {
  return {
    type: 'DELETE_MOVIMENTACAO_FINANCEIRA',
    payload: {id},
  };
}

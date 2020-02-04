export function signInRequest(email, senha) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: {email, senha},
  };
}

export function signInSuccess(token, tenantId, usuario) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: {token, tenantId,usuario},
  };
}

export function signUpRequest(nome, email, senha, navigation) {
  return {
    type: '@auth/SIGN_UP_REQUEST',
    payload: {nome, email, senha,navigation},
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}

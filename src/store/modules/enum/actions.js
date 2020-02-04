export function getEnum() {
  return {
    type: 'GET_ENUM',
  };
}

export function getEnumSuccess(data) {
  return {
    type: 'GET_ENUM_SUCCESS',
    payload:data,
  };
}

export function getEnumFailure() {
  return {
    type: 'GET_ENUM_FAILURE',
  };
}


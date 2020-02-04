import produce from 'immer';
const INITIAL_STATE = {
  enums:null,
  loading: false,
};

export default function Enum(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case 'GET_ENUM': {
        draft.loading = true;
        break;
      }
      case 'GET_ENUM_SUCCESS': {
        draft.enums = action.payload
        draft.loading = false;
        break;
      }
      case 'GET_ENUM_FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}

import produce from 'immer';
// -----------------------------------------------------------------------------
const INITIAL_STATE = {
  profile: null,
}
// -----------------------------------------------------------------------------
export default function worker(state= INITIAL_STATE, action) {
  // -----------------------------------------------------------------------------
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCCESS': {
        draft.profile = action.payload.worker;
        break;
      }
      default:
        return state;
    }
  })
}

import produce from 'immer';
// -----------------------------------------------------------------------------
const INITIAL_STATE = {
  profile: {},
};
// -----------------------------------------------------------------------------
export default function message(state= INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@message/UPDATE_MESSAGES_REQUEST': {
        draft.profile = action.payload;
        break;
      }
      default:
    }
  });
}

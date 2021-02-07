export function updateMessagesRequest(data) {
  return {
    type: '@message/UPDATE_MESSAGES_REQUEST',
    payload: { data },
  };
}

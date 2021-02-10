export function updateMessagesRequest(data) {
  return {
    type: '@message/UPDATE_MESSAGES_REQUEST',
    payload: { data },
  };
}
export function updateForwardMessage(message) {
  return {
    type: '@message/UPDATE_FORWARD_MESSAGE',
    payload: { message },
  };
}

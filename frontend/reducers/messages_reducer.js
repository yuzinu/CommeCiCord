import {
  CLEAR_MESSAGES,
  RECEIVE_ALL_MESSAGES,
  RECEIVE_MESSAGE,
  REMOVE_MESSAGE
} from "../actions/message_actions";

const messagesReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  let newState = Object.assign({}, oldState);

  switch (action.type) {
    case RECEIVE_ALL_MESSAGES:
      return action.messages;
    case RECEIVE_MESSAGE:
      newState[action.message.id] = action.message;
      return newState;
    case REMOVE_MESSAGE:
      delete newState[action.messageId];
      return newState;
    case CLEAR_MESSAGES:
      return [];
    default:
      return oldState;
  }
};

export default messagesReducer;
import * as MessageAPI from '../util/message_api_util';

export const RECEIVE_ALL_MESSAGES = 'RECEIVE_ALL_MESSAGES';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export const REMOVE_MESSAGE = 'REMOVE_MESSAGE';
export const CLEAR_MESSAGES = 'CLEAR_MESSAGES';

const receiveMessages = (messages) => {
  return {
    type: RECEIVE_ALL_MESSAGES,
    messages
  };
};

const receiveMessage = (message) => {
  return {
    type: RECEIVE_MESSAGE,
    message
  };
};
// 
const removeMessage = (messageId) => {
  return {
    type: REMOVE_MESSAGE,
    messageId
  };
};

export const clearMessages = () => ({
  type: CLEAR_MESSAGES,
});

export const fetchMessages = (channelId) => dispatch => {
  return (
    MessageAPI.fetchMessages(channelId).then(messages => dispatch(receiveMessages(messages)))
  );
};

export const fetchMessage = (messageId) => dispatch => {
  return (
    MessageAPI.fetchMessage(messageId).then(message => dispatch(receiveMessage(message)))
  );
};

export const createMessage = (message) => dispatch => {
  return (
    MessageAPI.createMessage(message).then(message => dispatch(receiveMessage(message)))
  );
};
// 
export const updateMessage = (message) => dispatch => {
  return (
    MessageAPI.updateMessage(message).then(message => dispatch(receiveMessage(message)))
  );
};

export const deleteMessage = (messageId) => dispatch => {
  return (
    MessageAPI.deleteMessage(messageId).then(() => dispatch(removeMessage(messageId)))
  );
};

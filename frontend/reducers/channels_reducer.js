import {
  CLEAR_CHANNELS,
  RECEIVE_ALL_CHANNELS,
  RECEIVE_CHANNEL,
  REMOVE_CHANNEL
} from "../actions/channel_actions";

const channelsReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  let newState = Object.assign({}, oldState);

  switch (action.type) {
    case RECEIVE_ALL_CHANNELS:
      return action.channels;
    case RECEIVE_CHANNEL:
      newState[action.channel.id] = action.channel;
      return newState;
    case REMOVE_CHANNEL:
      delete newState[action.channelId];
      return newState;
    case CLEAR_CHANNELS:
      return [];
    default:
      return oldState;
  }
};

export default channelsReducer;
import * as ChannelAPI from '../util/channel_api_util';

export const RECEIVE_ALL_CHANNELS = 'RECEIVE_ALL_CHANNELS';
export const RECEIVE_CHANNEL = 'RECEIVE_CHANNEL';
export const REMOVE_CHANNEL = 'REMOVE_CHANNEL';
export const CLEAR_CHANNELS = 'CLEAR_CHANNELS';

const receiveChannels = (channels) => {
  return {
    type: RECEIVE_ALL_CHANNELS,
    channels
  };
};

const receiveChannel = (channel) => {
  return {
    type: RECEIVE_CHANNEL,
    channel
  };
};
// 
const removeChannel = (channelId) => {
  return {
    type: REMOVE_channel,
    channelId
  };
};

export const clearChannels = () => ({
  type: CLEAR_CHANNELS,
});

export const fetchChannels = () => dispatch => {
  return (
    ChannelAPI.fetchChannels().then(channels => dispatch(receiveChannels(channels)))
  );
};

export const fetchChannel = (channelId) => dispatch => {
  return (
    ChannelAPI.fetchChannel(channelId).then(channel => dispatch(receiveChannel(channel)))
  );
};

export const createChannel = (channel) => dispatch => {
  return (
    ChannelAPI.createChannel(channel).then(channel => dispatch(receiveChannel(channel)))
  );
};
// 
export const updateChannel = (channel) => dispatch => {
  return (
    ChannelAPI.updateChannel(channel).then(channel => dispatch(receiveChannel(channel)))
  );
};

export const deleteChannel = (channelId) => dispatch => {
  return (
    ChannelAPI.deleteChannel(channelId).then(() => dispatch(removeChannel(channelId)))
  );
};
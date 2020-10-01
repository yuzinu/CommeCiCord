import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchChannel, fetchChannels, createChannel, updateChannel, deleteChannel, clearChannels } from '../../actions/channel_actions';
import { fetchServer } from '../../actions/server_actions';
import { logout } from '../../actions/session_actions';
import ChannelIndex from './channel_index';

const mSTP = ({ session, entities: { users, channels } }) => {
  return {
    currentUser: users[session.id],
    channels: Object.values(channels)
  };
};

const mDTP = dispatch => {
  return {
    fetchServer: (id) => dispatch(fetchServer(id)).then(promise => promise.server.channels.forEach(id => dispatch(fetchChannel(id)))), //????????????????????????
    fetchChannels: () => dispatch(fetchChannels()),
    fetchChannel: (id) => dispatch(fetchChannel(id)),
    createChannel: (channel) => dispatch(createChannel(channel)),
    updateChannel: (channel) => dispatch(updateChannel(channel)),
    deleteChannel: (id) => dispatch(deleteChannel(id)),
    clearChannels: () => dispatch(clearChannels()),
    logout: () => dispatch(logout()),
  };
};

export default withRouter(connect(mSTP, mDTP)(ChannelIndex));
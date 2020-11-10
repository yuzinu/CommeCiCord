import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchChannel, fetchChannels, createChannel, updateChannel, deleteChannel, clearChannels } from '../../actions/channel_actions';
import { fetchServer } from '../../actions/server_actions';
import { logout } from '../../actions/session_actions';
import ChannelIndex from './channel_index';

const mSTP = ({ session, entities: { users, servers, channels } }) => {
  return {
    currentUser: users[session.id],
    channels: Object.values(channels),
    servers: Object.values(servers)
  };
};

const mDTP = dispatch => {
  return {
    fetchServer: (id) => dispatch(fetchServer(id)).then(() => dispatch(fetchChannels(id))), //????????????????????????
    fetchChannels: (server_id) => dispatch(fetchChannels(server_id)),
    fetchChannel: (id) => dispatch(fetchChannel(id)),
    createChannel: (channel) => dispatch(createChannel(channel)),
    updateChannel: (channel) => dispatch(updateChannel(channel)),
    deleteChannel: (id) => dispatch(deleteChannel(id)),
    clearChannels: () => dispatch(clearChannels()),
    logout: () => dispatch(logout()),
  };
};

export default withRouter(connect(mSTP, mDTP)(ChannelIndex));
import { connect } from 'react-redux';
import ChatRoom from './ChatRoom';
import { fetchMessages, deleteMessage, createMessage, fetchMessage } from '../../actions/message_actions';
import { withRouter } from 'react-router-dom';
import { fetchUsers } from '../../actions/user_actions';
import { fetchChannels } from '../../actions/channel_actions';


const mSTP = (state, ownProps) => {
 
  let channelId = parseInt(ownProps.match.params.channelId);
  return {
    channelId,
    currentUser: state.entities.users[state.session.id],
    messages: Object.values(state.entities.messages),
    users: Object.values(state.entities.users),
    channels: Object.values(state.entities.channels)
  };
};

const mDTP = dispatch => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    fetchChannels: () => dispatch(fetchChannels()),
    fetchMessages: () => dispatch(fetchMessages()),
    fetchMessage: (message) => dispatch(fetchMessage(message)),
    createMessage: (message) => dispatch(createMessage(message)),
    deleteMessage: (id) => dispatch(deleteMessage(id)),
  };
};

export default withRouter(connect(mSTP, mDTP)(ChatRoom));
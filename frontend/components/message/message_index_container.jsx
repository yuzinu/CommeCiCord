import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchMessage, fetchMessages, createMessage, updateMessage, deleteMessage, clearMessages } from '../../actions/message_actions';
import { fetchChannel } from '../../actions/channel_actions';
import { logout } from '../../actions/session_actions';
import MessageIndex from './message_index';

const mSTP = ({ session, entities: { users, messages } }) => {
  return {
    currentUser: users[session.id],
    messages: Object.values(messages),
  };
};

const mDTP = dispatch => {
  return {
    fetchChannel: (id) => dispatch(fetchChannel(id)).then(promise => promise.channel.messages.forEach(id => dispatch(fetchMessage(id)))),
    fetchMessages: () => dispatch(fetchMessages()),
    fetchMessage: (id) => dispatch(fetchMessage(id)),
    createMessage: (message) => dispatch(createMessage(message)),
    updateMessage: (message) => dispatch(updateMessage(message)),
    deleteMessage: (id) => dispatch(deleteMessage(id)),
    clearMessages: () => dispatch(clearMessages()),
    logout: () => dispatch(logout()),
  };
};

export default withRouter(connect(mSTP, mDTP)(MessageIndex));
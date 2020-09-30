import { connect } from 'react-redux';
import { fetchServer, fetchServers, createServer, updateServer, deleteServer } from '../../actions/server_actions';
import { logout } from '../../actions/session_actions';

const mSTP = ({ session, entities: { users, servers } }) => {
  return {
    currentUser: users[session.id],
    servers: servers,
  };
};

const mDTP = dispatch => {
  return {
    fetchServer: (id) => dispatch(fetchServer(id)),
    fetchServers: () => dispatch(fetchServers()),
    createServer: (server) => dispatch(createServer(server)),
    updateServer: (server) => dispatch(updateServer(server)),
    deleteServer: (id) => dispatch(deleteServer(id)),
    logout: () => dispatch(logout()),
  };
};

export default connect(mSTP, mDTP)(Servers);
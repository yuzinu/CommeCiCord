import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { 
  fetchServer, 
  fetchServers, 
  createServer, 
  updateServer, 
  deleteServer } from '../../actions/server_actions';
import { logout } from '../../actions/session_actions';
import ServerIndex from './server_index';

const mSTP = ({ session, entities: { users, servers } }) => {
  return {
    currentUser: users[session.id],
    servers: Object.values(servers),
  };
};

const mDTP = dispatch => {
  return {
    fetchServers: () => dispatch(fetchServers()),
    fetchServer: (id) => dispatch(fetchServer(id)),
    createServer: (server) => dispatch(createServer(server)),
    updateServer: (server) => dispatch(updateServer(server)),
    deleteServer: (id) => dispatch(deleteServer(id)),
    logout: () => dispatch(logout()),
  };
};

export default withRouter(connect(mSTP, mDTP)(ServerIndex));
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { openModal, closeModal } from '../../actions/modal_actions';
import { fetchServers, createServer, deleteServer } from '../../actions/server_actions';

class ServerMenu extends React.Component {
  constructor(props) {
    super(props);

    this.deleteServer = this.props.deleteServer.bind(this);
  }

  componentDidMount() {
    this.props.fetchServers();
  }

  handleClick() {
 
  }

  render() {
    const server = this.props.server;

    return (
      <div className="server-menu">
        <button 
          className="delete-server"
          onClick={() => this.deleteServer(server.id)}
          >Delete Server</button>
      </div>
    )
  }
}

const mSTP = (state, ownProps) => {
  return {
    currentUser: state.entities.users[state.session.id],
    serverId: location.hash.spliy
  };
};

const mDTP = dispatch => {
  return {
    fetchServers: () => dispatch(fetchServers()),
    createServer: (server) => dispatch(createServer(server)),
    deleteServer: (serverId) => dispatch(deleteServer(serverId)),
    openModal: (modal) => dispatch(openModal(modal)),
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mSTP, mDTP)(ServerMenu);
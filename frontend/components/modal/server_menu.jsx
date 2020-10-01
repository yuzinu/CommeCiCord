import React from 'react';
import { withRouter } from 'react-router-dom';

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

export default ServerMenu;
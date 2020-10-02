import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import ServerIndexItem from './server_index_item';
import { openModal, closeModal } from '../../actions/modal_actions';

class ServerIndex extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   menu: false
    // }
    // this.handleClick = this.handleClick.bind(this);
    // this.handleContextMenu = this.handleContextMenu.bind(this);
  }

  componentDidMount() {
    this.props.fetchServers();
  }

  // handleClick(e) {
  //   e.preventDefault();
  //   const server = this.props.server;
  //   this.props.history.push(`/channels/${server.id}/${server.channels[0]}`)
  // }

  // handleContextMenu(e) {
  //   e.preventDefault();
  //   dispatch(openModal('server menu'))
  // }

  render() {
    const { servers } = this.props;

    if (servers.length < 1) {
      return null;
    }

    return (
      <div className="server-wrapper">
        <div className="server-bar">
          <div className="icon-padding">
            <img className="user-icon"
              src={this.props.currentUser.avatar}
              onClick={() => this.props.history.push(`/channels/@me`)}>
            </img>
          </div>
          <ul className="server-list">
            {servers.map(server => {
              return (
                <li 
                  // onClick={this.handleClick}
                  className="icon-padding"
                  server={server}
                  // onContextMenu={this.handleContextMenu}
                  key={server.id}>
                      <ServerIndexItem 
                        server={server} 
                        deleteServer={this.props.deleteServer}
                        updateServer={this.props.updateServer}
                      />
                </li>
              )
            })}
          </ul>
          <div className="icon-padding">
            <button 
              onClick={() => dispatch(openModal('create server'))}
              className="add-server">+</button>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(ServerIndex);

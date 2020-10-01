import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class ServerIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  // handleClick(e) {
  //   e.preventDefault();
  //   if (e.type === 'click') {
  //     this.props.history.push(`/channels/${this.props.server.id}/${this.props.server.channels[0]}`);
  //   }
  // }

  
  handleClick(e) {
    e.preventDefault();
    const server = this.props.server;
    this.props.history.push(`/channels/${server.id}/${server.channels[0]}`)
  }

  // use dynamic selector
  render() {
    const server = this.props.server;
    return (
      // <Link to={`${server.id}/${server.channels[0].id}`}>
        <img 
          onClick={this.handleClick}
          className="server-icon"
          src={server.icon}>
        </img>
      // </Link>
    )
  }
}

export default withRouter(ServerIndexItem);
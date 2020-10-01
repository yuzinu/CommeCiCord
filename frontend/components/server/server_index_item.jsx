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
    const initials = server.name.split(" ").map(name => name[0]).join(" ").toUpperCase();
    
    if (server.icon) {// <Link to={`${server.id}/${server.channels[0].id}`}>
      return (
        <img 
        onClick={this.handleClick}
        className="server-icon"
        src={server.icon}>
        </img>
      )
    } else {
      return (
        <h1
          onClick={this.handleClick}
          className="server-initials">
          {initials}
        </h1>
      )
    }
  }
}

export default withRouter(ServerIndexItem);
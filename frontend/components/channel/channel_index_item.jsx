import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class ChannelIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    const serverId = this.props.match.params.serverId;
    const channel = this.props.channel;
    this.props.history.push(`/channels/${serverId}/${channel.id}`);
  }
  // use dynamic selector
  render() {
    return (
      <button
        onClick={this.handleClick}
      >{'# ' + this.props.channel.name}</button>
    )
  }
}

export default withRouter(ChannelIndexItem);
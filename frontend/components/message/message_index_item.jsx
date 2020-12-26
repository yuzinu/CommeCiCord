import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class MessageIndexItem extends React.Component {
  constructor(props) {
    super(props);
    // this.handleClick = this.handleClick.bind(this);
  }

  // handleClick(e) {
  //   e.preventDefault();
  //   if (e.type === 'click') {
  //     this.props.history.push(`/channels/${this.props.server.id}/${this.props.server.channels[0]}`);
  //   }
  // }

  // use dynamic selector
  render() {
    console.log(this.props.message);
    return (
      <>
        <h1 className="icon-padding">{this.props.message.author}</h1>
        <h1 className="icon-padding">{this.props.message.body}</h1>
      </>
    )
  }
}

export default withRouter(MessageIndexItem);
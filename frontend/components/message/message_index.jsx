import React from 'react';
import { withRouter } from 'react-router-dom';
import MessageIndexItem from './message_index_item';
import { openModal, closeModal } from '../../actions/modal_actions';

class MessageIndex extends React.Component {
  constructor(props) {
    super(props);
    // this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchChannel(parseInt(this.props.match.params.channelId));
    // .then(() => (
    // this.state.entities.servers[parseInt(this.props.match.params.serverId)].channels.forEach(channel => {
    //   this.props.fetchChannel(channel.id);
    // })));
  }

  componentDidUpdate(prevProps) {
    // debugger;
    if (prevProps.location !== this.props.location) {
      this.props.clearMessages();
      this.props.fetchChannel(parseInt(this.props.match.params.channelId));
      // this.setState({messages: []});
    }
  }

  // componentWillUnmount() {
  //   debugger;
  //   // this.props.clearMessages();
  // }

  handleClick() {
    // const benchId = this.props.bench.id;
    // this.props.history.push(`/benches/${benchId}`);
  }

  render() {
    const messages = this.props.messages;
    // debugger;
    if (messages.length < 1) {
      return null;
    }

    return (
      <div className="message-wrapper">
        <div className="message-bar">
          {/* <h1>{messages[0].body}</h1> */}
          <ul className="message-list">
            {messages.map(message => {
              return (
                <li 
                  className="icon-padding"
                  message={message}
                  key={message.id}>
                  <MessageIndexItem 
                    message={message} 
                    deleteMessage={this.props.deleteMessage}
                    updateMessage={this.props.updateMessage}
                  />
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}

export default withRouter(MessageIndex);

import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchUsers } from '../../actions/user_actions';
import { fetchMessages, deleteMessage, createMessage, fetchMessage } from '../../actions/message_actions';
import { fetchChannels } from '../../actions/channel_actions';
import Message from "./message";
import MessageForm from "./message_form";

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);

    this.bottom = React.createRef();
    // this.currentMessages = this.currentMessages.bind(this);
    // this.getChannelName = this.getChannelName.bind(this);
  }
  
  componentDidMount() {
    let fetchMessage = this.props.fetchMessage.bind(this);
    let channelId = this.props.match.params.channelId;
    this.props.fetchMessages(channelId);
    // this.props.fetchUsers();

    App.cable.subscriptions.create(
      { channel: "ChatChannel", messageable_id: channelId },
      {
        received: data => {
          fetchMessage(data.id);
        },
        speak: function(data) {
          return this.perform("speak", data)
        },
        update: function(data) {
          return this.perform("update", data)
        },
        load: function() {return this.perform("load")}
      }
    );
  }
  
  // loadChat(e) {
  //   e.preventDefault();
  //   App.cable.subscriptions.subscriptions[0].load();
  // }
  
  componentDidUpdate(prevProps) {
    if (prevProps.location !== this.props.location) {
      let channelId = parseInt(this.props.match.params.channelId) 
      // this.setState(
      //   {messsageable_id: channelId},
      //   () => 
        this.props.fetchMessages(channelId)
      // )
    }
    if (this.bottom && this.bottom.current) {
      this.bottom.current.scrollIntoView();
    }
  }
  
  render() {
    let messageList = (
        <li>
          <div className="message-container">no messages here yet</div>
          <div ref={this.bottom} />
        </li>
    )

    messageList = this.props.messages.map((message, idx) => {
      return (
        <li key={message.id}>
          <Message message={message} {...this.props} />
          <div ref={this.bottom}></div>
        </li>
      );
    });

    const channels = this.props.channels;
    let display;    
    if (channels.length < 1) {
      display = "";
    } else {
      let channel = channels.find(channel => channel.id === parseInt(this.props.match.params.channelId));
      if (channel){
        display = channel.name;
      }
    }

    return (
      <div className="chatroom-container">
        <div className="chatroom-channel"># {display}</div>
        {/* <button className="load-button" 
          onClick={this.loadChat.bind(this)}>
          Load Chat History
        </button> */}
        <div className="message-list">
          {messageList}
        </div>
        <MessageForm {...this.props} currentChannel={display} />
      </div>
    );
  }
}

const mSTP = (state, ownProps) => {
 
  let channelId = parseInt(ownProps.match.params.channelId);
  return {
    channelId,
    currentUser: state.entities.users[state.session.id],
    messages: Object.values(state.entities.messages),
    users: Object.values(state.entities.users),
    channels: Object.values(state.entities.channels)
  };
};

const mDTP = dispatch => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    fetchChannels: () => dispatch(fetchChannels()),
    fetchMessages: (channelId) => dispatch(fetchMessages(channelId)),
    fetchMessage: (message) => dispatch(fetchMessage(message)),
    createMessage: (message) => dispatch(createMessage(message)),
    deleteMessage: (id) => dispatch(deleteMessage(id)),
  };
};

export default withRouter(connect(mSTP, mDTP)(ChatRoom));
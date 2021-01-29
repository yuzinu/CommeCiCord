import React from "react";
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
    this.props.fetchMessages();
    this.props.fetchUsers();

    App.cable.subscriptions.create(
      { channel: "ChatChannel", channelId: this.props.match.params.channelId },
      {
        received: data => {
          fetchMessage(data.id);
        },
        speak: function(data) {
          return this.perform("speak", data)
        },
      load: function() {return this.perform("load")}
      }
    );
  }
  
  // loadChat(e) {
  //   e.preventDefault();
  //   App.cable.subscriptions.subscriptions[0].load();
  // }
  
  componentDidUpdate() {
    this.bottom.current.scrollIntoView();
  }
  
  currentMessages() {
    let messages = this.props.messages;
    let channelId = this.props.channelId;

    let channelMessages = [];
    if (messages.length > 0) {
      channelMessages = messages.filter(message => (message.channel_id === channelId))
    }
    return channelMessages;
  }

  render() {
    let messageList = (
        <li>
          <div className="message-container">no messages here yet</div>
          <div ref={this.bottom} />
        </li>
    )
    let currentChannelMessages = this.currentMessages();
    if (currentChannelMessages.length > 0) {
      messageList = currentChannelMessages.map((message, idx) => {
        return (
          <li key={message.id}>
            <div className="message-container">
              <img className="message-avatar" src={message.avatar}></img>
              <div className="message-body">
                <div className="message-author">
                  {message.author}
                </div>
                <div>
                  {message.body}
                </div>
              </div>
            </div>
            <div ref={this.bottom} />
          </li>
        );
      });
    } 

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
        <MessageForm props={this.props} currentChannel={display} currentUser={this.props.currentUser}/>
      </div>
    );
  }
}

export default ChatRoom;
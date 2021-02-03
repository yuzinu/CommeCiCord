import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { openModal, closeModal } from '../../actions/modal_actions';
import { logout } from '../../actions/session_actions';
import { fetchServer } from '../../actions/server_actions';
import { fetchChannel, fetchChannels, createChannel, updateChannel, deleteChannel, clearChannels } from '../../actions/channel_actions';
import ChannelIndexItem from './channel_index_item';
import ChatRoom from '../message_form/chatroom';

class ChannelIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      server_id: parseInt(this.props.match.params.serverId)
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchChannels(parseInt(this.props.match.params.serverId));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location !== this.props.location) {
      this.setState(
        {server_id: parseInt(this.props.match.params.serverId)},
        () => this.props.fetchChannels(parseInt(this.props.match.params.serverId))
      )
    }
  }

  update(field) {
    return (e) => {
      this.setState({ [field]: e.target.value});
    };
  }


  handleSubmit(e) {
    const serverId = parseInt(this.props.match.params.serverId);
    e.preventDefault();
    const channel = Object.assign({}, this.state);
    this.setState(
      { name: "" }, 
      () => this.props.createChannel(channel)
        .then(promise => {
          this.props.history.push(`/channels/${serverId}/${promise.channel.id}`);
        })
    );
  }

  render() {
    const [servers, channels] = [this.props.servers, this.props.channels];
    
    let display;
    if (servers.length < 1) {
      display = "";
      return null;
    } else {
      let server = servers.find(server => server.id === parseInt(this.props.match.params.serverId));
      if (server) {
        display = server.name;
      }
    }
    
    return (
      <div className="channel-wrapper">
        <div className="channel-bar">
          <div className="channel-list-wrapper">
            <h1 className="current-channel">{display}</h1>
            <ul className="channel-list">
              {channels.map(channel => {
                return (
                  <li 
                  className="icon-padding"
                  channel={channel}
                  key={channel.id}>
                    <ChannelIndexItem 
                      channel={channel} 
                      deleteChannel={this.props.deleteChannel}
                      updateChannel={this.props.updateChannel}
                      />
                  </li>
                )
              })}
            </ul>
          </div>
          <form className="add-channel"
            onSubmit={this.handleSubmit}>
            <label>CHANNEL NAME</label>
            <input placeholder="Enter a channel name"
              value={this.state.name}
              onChange={this.update("name")}/>
            <button>Create</button>
          </form>
        </div>
        <div className="message-wrapper">
          <ChatRoom />
        </div>
      </div>
    )
  }
}

const mSTP = ({ session, entities: { users, servers, channels } }) => {
  return {
    currentUser: users[session.id],
    channels: Object.values(channels),
    servers: Object.values(servers)
  };
};

const mDTP = dispatch => {
  return {
    fetchServer: (id) => dispatch(fetchServer(id)).then(() => dispatch(fetchChannels(id))), //????????????????????????
    fetchChannels: (server_id) => dispatch(fetchChannels(server_id)),
    fetchChannel: (id) => dispatch(fetchChannel(id)),
    createChannel: (channel) => dispatch(createChannel(channel)),
    updateChannel: (channel) => dispatch(updateChannel(channel)),
    deleteChannel: (id) => dispatch(deleteChannel(id)),
    clearChannels: () => dispatch(clearChannels()),
    logout: () => dispatch(logout()),
  };
};

export default withRouter(connect(mSTP, mDTP)(ChannelIndex));
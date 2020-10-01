import React from 'react';
import { withRouter } from 'react-router-dom';
import ChannelIndexItem from './channel_index_item';
import { openModal, closeModal } from '../../actions/modal_actions';

class ChannelIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      server_id: parseInt(this.props.match.params.serverId)
    }
    // this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // debugger;
    this.props.fetchServer(parseInt(this.props.match.params.serverId));
    // .then(() => (
    // this.state.entities.servers[parseInt(this.props.match.params.serverId)].channels.forEach(channel => {
    //   this.props.fetchChannel(channel.id);
    // })));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location !== this.props.location) {
      this.props.clearChannels();
      this.props.fetchServer(parseInt(this.props.match.params.serverId));
    }
  }

  update(field) {
    return (e) => {
      this.setState({ [field]: e.target.value});
    };
  }


  handleSubmit(e) {
    const { serverId } = this.props.match.params;
    e.preventDefault();
    const channel = Object.assign({}, this.state);
    this.setState({ name: "" }, () => (this.props.createChannel(channel)
      .then(promise => this.props.history.push(`/channels/${serverId}/${promise.channel.id}`))));
  }

  render() {
    const channels = this.props.channels;
    let display;    
    if (channels.length < 1) {
      display = "";
      return null;
    } else {
      let channel = channels.find(channel => channel.id === parseInt(this.props.match.params.channelId));
      if (channel){
        display = channel.name;
      }
    }
    // const channel = Object.values[this.props.channels][this.props.match.params.channelId];
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
      </div>
    )
  }
}

export default withRouter(ChannelIndex);

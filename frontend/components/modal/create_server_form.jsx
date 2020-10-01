import React from 'react';
import { withRouter } from 'react-router-dom';

class CreateServerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      owner_id: this.props.currentUser.id
    };
    this.fetchServers = this.props.fetchServers;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return (e) => {
      this.setState({ [field]: e.target.value});
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const server = this.state;
    this.props.createServer(server)
      .then(promise => { 
        this.props.history.push(`/channels/${promise.server.id}/${promise.server.channels[0]}`) })
      
        this.props.closeModal();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>CREATE YOUR SERVER</div>
          
          <div>
            <label>SERVER NAME</label>
            <input type="text" placeholder="Enter a server name" value={this.state.name} onChange={this.update("name")}/>
          </div>
          <button>Create</button>
        </form>
      </div>
    )
  }
}

export default withRouter(CreateServerForm);